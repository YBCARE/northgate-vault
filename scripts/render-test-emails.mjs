import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildStatusEmail } from '../server/emailTemplate.js'
import { STATUSES } from '../server/constants.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'tmp-email-preview')
mkdirSync(outDir, { recursive: true })

const baseConsignment = {
  reference_number: 'NGV-1234567',
  client_name: 'Jane Whitfield',
  movement_type: 'custody',
  current_location_city: 'Zurich',
  current_location_country: 'Switzerland',
  custody_started_at: '2026-08-01T10:00:00.000Z',
  is_closed: false,
  updated_at: '2026-08-25T14:30:00.000Z',
}

const items = [
  { asset_type: 'cash', quantity: '500,000 USD' },
  { asset_type: 'vehicle', quantity: '1' },
]

for (const status of STATUSES) {
  const consignment = { ...baseConsignment, current_status: status }
  const { subject, html } = buildStatusEmail({ consignment, items, baseUrl: 'http://localhost:4100' })
  const file = path.join(outDir, `${status}.html`)
  writeFileSync(file, html, 'utf8')
  console.log(`${status} -> ${file}`)
  console.log(`  subject: ${subject}`)
}
