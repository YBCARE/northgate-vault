import { Resend } from 'resend'
import { buildStatusEmail } from './emailTemplate.js'

export const emailFrom = process.env.EMAIL_FROM || 'Northgate Vault <onboarding@resend.dev>'

export function getBaseUrl() {
  return process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 4000}`
}

// Best-effort send: throws on failure so the caller can log it, but the
// caller must never let this failure roll back a database write.
export async function sendConsignmentStatusEmail({ consignment, items, clientEmail }) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { subject, html } = buildStatusEmail({ consignment, items, baseUrl: getBaseUrl() })

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: clientEmail,
    subject,
    html,
  })

  if (error) throw new Error(error.message || 'Resend rejected the message')
}
