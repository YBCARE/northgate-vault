import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { pool } from '../db.js'
import { daysSince } from '../utils.js'

const router = Router()

// Deter reference-number enumeration without blocking a legitimate client
// re-checking their own shipment a handful of times.
const trackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again shortly.' },
})

const NOT_FOUND_MESSAGE = { error: 'No consignment found for this reference. Please verify the number or contact your account manager.' }

router.get('/:referenceNumber', trackLimiter, async (req, res) => {
  const referenceNumber = String(req.params.referenceNumber || '').trim()

  if (!referenceNumber) return res.status(404).json(NOT_FOUND_MESSAGE)

  try {
    const { rows } = await pool.query(
      `SELECT id, reference_number, movement_type, current_status, current_location_city,
              current_location_country, origin_city, origin_country, destination_city,
              destination_country, custody_started_at, is_closed, updated_at, created_at
       FROM consignments WHERE reference_number = $1`,
      [referenceNumber],
    )

    const consignment = rows[0]
    if (!consignment) return res.status(404).json(NOT_FOUND_MESSAGE)

    const [itemsResult, eventsResult] = await Promise.all([
      pool.query(
        `SELECT asset_type, description, quantity FROM consignment_items WHERE consignment_id = $1 ORDER BY id ASC`,
        [consignment.id],
      ),
      pool.query(
        `SELECT status, location_city, location_country, occurred_at
         FROM custody_events WHERE consignment_id = $1 ORDER BY occurred_at DESC, id DESC`,
        [consignment.id],
      ),
    ])

    const custodyDurationDays = consignment.movement_type === 'custody' && consignment.custody_started_at
      ? daysSince(consignment.custody_started_at)
      : null

    return res.json({
      reference_number: consignment.reference_number,
      movement_type: consignment.movement_type,
      current_status: consignment.current_status,
      is_closed: consignment.is_closed,
      current_location: {
        city: consignment.current_location_city,
        country: consignment.current_location_country,
      },
      origin: { city: consignment.origin_city, country: consignment.origin_country },
      destination: { city: consignment.destination_city, country: consignment.destination_country },
      custody_started_at: consignment.custody_started_at,
      custody_duration_days: custodyDurationDays,
      updated_at: consignment.updated_at,
      items: itemsResult.rows,
      events: eventsResult.rows,
    })
  } catch (error) {
    console.error('Track lookup failed:', error)
    return res.status(500).json({ error: 'We could not complete this lookup. Please try again shortly.' })
  }
})

export default router
