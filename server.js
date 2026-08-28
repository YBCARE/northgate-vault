import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { Resend } from 'resend'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from './server/db.js'
import { sessionMiddleware } from './server/auth.js'
import trackRouter from './server/routes/track.js'
import adminApiRouter from './server/routes/adminApi.js'
import adminPagesRouter from './server/routes/adminPages.js'

const app = express()
const port = process.env.PORT || 4000
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendDir = path.join(__dirname, 'dist')
const emailFrom = process.env.EMAIL_FROM || 'Northgate Vault <onboarding@resend.dev>'

app.set('trust proxy', 1)
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true }))
app.use(express.json({ limit: '100kb' }))

// Health endpoint used by Render and simple uptime checks.
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Custody tracking system: public lookup, then session-protected admin API
// and server-rendered admin panel. Mounted before the SPA static fallback
// below so they are never shadowed by it. The session middleware instance is
// shared across both mounts so a login via the API is recognized by the
// server-rendered pages (two separate instances would mean two separate
// in-memory session stores).
const adminSession = sessionMiddleware()
app.use('/api/track', trackRouter)
app.use('/api/admin', adminSession, adminApiRouter)
app.use('/admin', adminSession, adminPagesRouter)

const requiredFields = ['full_name', 'service_type', 'description', 'contact_method', 'email', 'phone']
const allowedContactMethods = new Set(['Email', 'Phone'])

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char])
}

function emailLayout(title, content) {
  return `<!doctype html><html><body style="margin:0;background:#0a1628;color:#f5f4ef;font-family:Arial,Helvetica,sans-serif"><div style="max-width:600px;margin:0 auto;padding:40px 24px"><p style="margin:0 0 28px;color:#c9a84c;letter-spacing:2px;font-size:12px;font-weight:bold">NORTHGATE VAULT</p><div style="border-top:1px solid #c9a84c;padding-top:28px"><h1 style="font-family:Georgia,serif;font-size:30px;font-weight:normal;margin:0 0 18px">${title}</h1>${content}</div><p style="margin:36px 0 0;color:#aeb5be;font-size:12px;line-height:18px">High-security valuables custody and secure transport.</p></div></body></html>`
}

async function sendEmail(client, message) {
  const { error } = await client.emails.send(message)
  if (error) throw new Error(error.message || 'Resend rejected the message')
}

// Persist the inquiry first, then notify the team and acknowledge the client.
app.post('/api/quote', async (req, res) => {
  const quote = Object.fromEntries(Object.entries(req.body || {}).map(([key, value]) => [key, clean(value)]))
  const missing = requiredFields.filter(field => !quote[field])

  if (missing.length || !/^\S+@\S+\.\S+$/.test(quote.email) || !allowedContactMethods.has(quote.contact_method)) {
    return res.status(400).json({ error: 'Please provide complete, valid contact details.' })
  }

  try {
    await pool.query(
      `INSERT INTO quote_requests
        (full_name, organization, service_type, description, contact_method, email, phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [quote.full_name, quote.organization || null, quote.service_type, quote.description, quote.contact_method, quote.email, quote.phone],
    )

    const details = [
      ['Full name', quote.full_name], ['Organization', quote.organization || 'Not provided'], ['Service', quote.service_type],
      ['Description', quote.description], ['Contact preference', quote.contact_method], ['Email', quote.email], ['Phone', quote.phone],
    ].map(([label, value]) => `<tr><td style="padding:7px 16px 7px 0;color:#c9a84c;vertical-align:top;font-size:12px;letter-spacing:.4px">${label.toUpperCase()}</td><td style="padding:7px 0;line-height:20px">${escapeHtml(value)}</td></tr>`).join('')

    const resend = new Resend(process.env.RESEND_API_KEY)
    await Promise.all([
      sendEmail(resend, {
        from: emailFrom, to: process.env.ADMIN_EMAIL,
        subject: `New quote request — ${quote.full_name}`,
        html: emailLayout('New confidential inquiry', `<table style="border-collapse:collapse;font-size:14px">${details}</table>`),
      }),
      sendEmail(resend, {
        from: emailFrom, to: quote.email,
        subject: 'We received your Northgate Vault inquiry',
        html: emailLayout('Your inquiry is received', '<p style="margin:0;color:#d6d9dd;line-height:24px">Thank you for contacting Northgate Vault. A representative will review your request and contact you shortly through your preferred method.</p>'),
      }),
    ])

    return res.status(200).json({ message: 'Quote request received.' })
  } catch (error) {
    console.error('Quote request failed:', error)
    return res.status(500).json({ error: 'We could not send your request. Please try again shortly.' })
  }
})

// Render serves the Vite build from this same Express service. The fallback
// keeps client-side routes working while allowing /api/* routes above to win.
app.use(express.static(frontendDir))
app.get('/{*splat}', (_req, res) => res.sendFile(path.join(frontendDir, 'index.html')))

app.listen(port, () => console.log(`Northgate Vault listening on port ${port}`))
