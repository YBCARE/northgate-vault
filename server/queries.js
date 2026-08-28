import { pool } from './db.js'
import { STATUSES, MOVEMENT_TYPES } from './constants.js'

export async function listConsignments({ search, status, movementType, openState } = {}) {
  const conditions = []
  const params = []

  if (search) {
    params.push(`%${search}%`)
    conditions.push(`(c.reference_number ILIKE $${params.length} OR c.client_name ILIKE $${params.length} OR c.organization ILIKE $${params.length})`)
  }
  if (status && STATUSES.includes(status)) {
    params.push(status)
    conditions.push(`c.current_status = $${params.length}`)
  }
  if (movementType && MOVEMENT_TYPES.includes(movementType)) {
    params.push(movementType)
    conditions.push(`c.movement_type = $${params.length}`)
  }
  if (openState === 'open') conditions.push('c.is_closed = false')
  if (openState === 'closed') conditions.push('c.is_closed = true')

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const { rows } = await pool.query(
    `SELECT c.id, c.reference_number, c.client_name, c.organization, c.movement_type,
            c.current_status, c.is_closed, c.updated_at,
            COALESCE(agg.item_count, 0) AS item_count,
            COALESCE(agg.has_vehicle, false) AS has_vehicle
     FROM consignments c
     LEFT JOIN (
       SELECT consignment_id, COUNT(*)::int AS item_count, BOOL_OR(asset_type = 'vehicle') AS has_vehicle
       FROM consignment_items
       GROUP BY consignment_id
     ) agg ON agg.consignment_id = c.id
     ${whereClause}
     ORDER BY c.updated_at DESC`,
    params,
  )
  return rows
}

export async function fetchConsignmentDetail(id) {
  const { rows } = await pool.query('SELECT * FROM consignments WHERE id = $1', [id])
  const consignment = rows[0]
  if (!consignment) return null

  const [items, events] = await Promise.all([
    pool.query('SELECT * FROM consignment_items WHERE consignment_id = $1 ORDER BY id ASC', [id]),
    pool.query('SELECT * FROM custody_events WHERE consignment_id = $1 ORDER BY occurred_at DESC, id DESC', [id]),
  ])

  return { consignment, items: items.rows, events: events.rows }
}
