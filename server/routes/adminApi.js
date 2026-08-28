import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { pool } from '../db.js'
import { passwordsMatch, requireAdminApi } from '../auth.js'
import { clean, generateReferenceNumber, isValidEmail } from '../utils.js'
import { MOVEMENT_TYPES, STATUSES, ASSET_TYPES } from '../constants.js'
import { sendConsignmentStatusEmail } from '../mailer.js'
import { listConsignments, fetchConsignmentDetail } from '../queries.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again shortly.' },
})

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

router.post('/login', loginLimiter, (req, res) => {
  const password = clean(req.body?.password)
  if (!passwordsMatch(password, process.env.ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'Incorrect password.' })
  }
  req.session.isAdmin = true
  return res.json({ ok: true })
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }))
})

router.use(requireAdminApi)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function validateItem(item) {
  const assetType = clean(item.asset_type)
  const description = clean(item.description)
  if (!ASSET_TYPES.includes(assetType)) return `Invalid asset type: ${assetType || '(empty)'}`
  if (!description) return 'Item description is required.'
  return null
}

// ---------------------------------------------------------------------------
// List / search
// ---------------------------------------------------------------------------

router.get('/consignments', async (req, res) => {
  try {
    const rows = await listConsignments({
      search: clean(req.query.search),
      status: clean(req.query.status),
      movementType: clean(req.query.movement_type),
      openState: clean(req.query.open_state),
    })
    res.json({ consignments: rows })
  } catch (error) {
    console.error('List consignments failed:', error)
    res.status(500).json({ error: 'Could not load consignments.' })
  }
})

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

router.post('/consignments', async (req, res) => {
  const body = req.body || {}
  const clientName = clean(body.client_name)
  const clientEmail = clean(body.client_email)
  const organization = clean(body.organization)
  const movementType = clean(body.movement_type)
  const notes = clean(body.notes)
  const originCity = clean(body.origin_city)
  const originCountry = clean(body.origin_country)
  const destinationCity = clean(body.destination_city)
  const destinationCountry = clean(body.destination_country)
  const items = Array.isArray(body.items) ? body.items : []
  let referenceNumber = clean(body.reference_number)

  if (!clientName) return res.status(400).json({ error: 'Client name is required.' })
  if (!clientEmail || !isValidEmail(clientEmail)) return res.status(400).json({ error: 'A valid client email is required.' })
  if (!MOVEMENT_TYPES.includes(movementType)) return res.status(400).json({ error: 'Invalid movement type.' })

  for (const item of items) {
    const itemError = validateItem(item)
    if (itemError) return res.status(400).json({ error: itemError })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    if (!referenceNumber) {
      referenceNumber = generateReferenceNumber()
    } else {
      const existing = await client.query('SELECT id FROM consignments WHERE reference_number = $1', [referenceNumber])
      if (existing.rows.length) throw Object.assign(new Error('Reference number already in use.'), { statusCode: 400 })
    }

    const initialStatus = 'collection_scheduled'
    const { rows } = await client.query(
      `INSERT INTO consignments
        (reference_number, client_name, client_email, organization, movement_type, current_status,
         origin_city, origin_country, destination_city, destination_country, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [referenceNumber, clientName, clientEmail, organization || null, movementType, initialStatus,
        originCity || null, originCountry || null, destinationCity || null, destinationCountry || null, notes || null],
    )
    const consignment = rows[0]

    for (const item of items) {
      await client.query(
        `INSERT INTO consignment_items (consignment_id, asset_type, description, quantity, seal_number)
         VALUES ($1, $2, $3, $4, $5)`,
        [consignment.id, clean(item.asset_type), clean(item.description), clean(item.quantity) || null, clean(item.seal_number) || null],
      )
    }

    await client.query(
      `INSERT INTO custody_events (consignment_id, status, note) VALUES ($1, $2, $3)`,
      [consignment.id, initialStatus, 'Consignment created.'],
    )

    await client.query('COMMIT')
    res.status(201).json({ consignment })
  } catch (error) {
    await client.query('ROLLBACK')
    if (error.statusCode) return res.status(error.statusCode).json({ error: error.message })
    console.error('Create consignment failed:', error)
    res.status(500).json({ error: 'Could not create consignment.' })
  } finally {
    client.release()
  }
})

// ---------------------------------------------------------------------------
// Detail
// ---------------------------------------------------------------------------

router.get('/consignments/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid consignment id.' })

  try {
    const detail = await fetchConsignmentDetail(id)
    if (!detail) return res.status(404).json({ error: 'Consignment not found.' })
    res.json(detail)
  } catch (error) {
    console.error('Fetch consignment failed:', error)
    res.status(500).json({ error: 'Could not load consignment.' })
  }
})

// ---------------------------------------------------------------------------
// Edit
// ---------------------------------------------------------------------------

const EDITABLE_FIELDS = [
  'client_name', 'client_email', 'organization', 'origin_city', 'origin_country',
  'destination_city', 'destination_country', 'notes',
]

router.patch('/consignments/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid consignment id.' })

  const body = req.body || {}
  if (body.client_email !== undefined && body.client_email !== '' && !isValidEmail(clean(body.client_email))) {
    return res.status(400).json({ error: 'Invalid client email.' })
  }

  const setClauses = []
  const params = []
  for (const field of EDITABLE_FIELDS) {
    if (body[field] === undefined) continue
    params.push(clean(body[field]) || null)
    setClauses.push(`${field} = $${params.length}`)
  }
  if (!setClauses.length) return res.status(400).json({ error: 'No editable fields provided.' })

  params.push(id)
  try {
    const { rows } = await pool.query(
      `UPDATE consignments SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = $${params.length} RETURNING *`,
      params,
    )
    if (!rows[0]) return res.status(404).json({ error: 'Consignment not found.' })
    res.json({ consignment: rows[0] })
  } catch (error) {
    console.error('Update consignment failed:', error)
    res.status(500).json({ error: 'Could not update consignment.' })
  }
})

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

router.post('/consignments/:id/items', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid consignment id.' })

  const itemError = validateItem(req.body || {})
  if (itemError) return res.status(400).json({ error: itemError })

  try {
    const { rows } = await pool.query(
      `INSERT INTO consignment_items (consignment_id, asset_type, description, quantity, seal_number)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, clean(req.body.asset_type), clean(req.body.description), clean(req.body.quantity) || null, clean(req.body.seal_number) || null],
    )
    res.status(201).json({ item: rows[0] })
  } catch (error) {
    console.error('Add item failed:', error)
    res.status(500).json({ error: 'Could not add item.' })
  }
})

router.delete('/consignments/:id/items/:itemId', async (req, res) => {
  const id = Number(req.params.id)
  const itemId = Number(req.params.itemId)
  if (!Number.isInteger(id) || !Number.isInteger(itemId)) return res.status(400).json({ error: 'Invalid id.' })

  try {
    const { rowCount } = await pool.query(
      'DELETE FROM consignment_items WHERE id = $1 AND consignment_id = $2',
      [itemId, id],
    )
    if (!rowCount) return res.status(404).json({ error: 'Item not found.' })
    res.json({ ok: true })
  } catch (error) {
    console.error('Remove item failed:', error)
    res.status(500).json({ error: 'Could not remove item.' })
  }
})

// ---------------------------------------------------------------------------
// Events — the main action: insert event, update consignment, send email
// ---------------------------------------------------------------------------

router.post('/consignments/:id/events', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid consignment id.' })

  const status = clean(req.body?.status)
  const locationCity = clean(req.body?.location_city)
  const locationCountry = clean(req.body?.location_country)
  const note = clean(req.body?.note)

  if (!STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status.' })

  const client = await pool.connect()
  let consignment
  try {
    await client.query('BEGIN')

    const existingResult = await client.query('SELECT * FROM consignments WHERE id = $1 FOR UPDATE', [id])
    const existing = existingResult.rows[0]
    if (!existing) throw Object.assign(new Error('Consignment not found.'), { statusCode: 404 })

    await client.query(
      `INSERT INTO custody_events (consignment_id, status, location_city, location_country, note)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, status, locationCity || null, locationCountry || null, note || null],
    )

    const shouldStartCustody = status === 'in_custody' && !existing.custody_started_at
    const custodyStartedAt = shouldStartCustody ? new Date() : existing.custody_started_at

    const updateResult = await client.query(
      `UPDATE consignments
       SET current_status = $1,
           current_location_city = COALESCE($2, current_location_city),
           current_location_country = COALESCE($3, current_location_country),
           custody_started_at = $4,
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [status, locationCity || null, locationCountry || null, custodyStartedAt, id],
    )
    consignment = updateResult.rows[0]

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    client.release()
    if (error.statusCode) return res.status(error.statusCode).json({ error: error.message })
    console.error('Create event failed:', error)
    return res.status(500).json({ error: 'Could not record this update.' })
  }
  client.release()

  // The database write has already committed. Email is best-effort from here
  // on — a failure must never appear to roll back the update above.
  let emailWarning = null
  try {
    const itemsResult = await pool.query(
      'SELECT asset_type, quantity FROM consignment_items WHERE consignment_id = $1',
      [id],
    )
    await sendConsignmentStatusEmail({ consignment, items: itemsResult.rows, clientEmail: consignment.client_email })
    await pool.query(
      `UPDATE custody_events SET email_sent = true
       WHERE id = (SELECT id FROM custody_events WHERE consignment_id = $1 ORDER BY occurred_at DESC, id DESC LIMIT 1)`,
      [id],
    )
  } catch (error) {
    console.error(`Status email failed for consignment ${id}:`, error)
    emailWarning = 'The status was updated, but the notification email could not be sent.'
  }

  res.status(201).json({ consignment, emailWarning })
})

// ---------------------------------------------------------------------------
// Close
// ---------------------------------------------------------------------------

router.post('/consignments/:id/close', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid consignment id.' })

  try {
    const { rows } = await pool.query(
      `UPDATE consignments SET is_closed = true, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id],
    )
    if (!rows[0]) return res.status(404).json({ error: 'Consignment not found.' })
    res.json({ consignment: rows[0] })
  } catch (error) {
    console.error('Close consignment failed:', error)
    res.status(500).json({ error: 'Could not close consignment.' })
  }
})

// ---------------------------------------------------------------------------
// Resend email
// ---------------------------------------------------------------------------

router.post('/consignments/:id/resend-email', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid consignment id.' })

  try {
    const detail = await fetchConsignmentDetail(id)
    if (!detail) return res.status(404).json({ error: 'Consignment not found.' })

    await sendConsignmentStatusEmail({
      consignment: detail.consignment,
      items: detail.items,
      clientEmail: detail.consignment.client_email,
    })
    res.json({ ok: true })
  } catch (error) {
    console.error(`Resend email failed for consignment ${id}:`, error)
    res.status(502).json({ error: 'Could not send the email. Please try again shortly.' })
  }
})

export default router
