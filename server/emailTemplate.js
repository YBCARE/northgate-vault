import { STATUS_LABELS, ASSET_TYPE_LABELS, formatLocation, statusHeadline } from './constants.js'
import { escapeHtml, daysSince } from './utils.js'

const NAVY = '#0a1f44'
const NAVY_DEEP = '#071529'
const ACCENT = '#1a5f9e'
const LIGHT_GREY = '#f4f6f8'
const BORDER = '#dde2e8'
const BODY_TEXT = '#2c3e50'

function formatDate(value) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDateTime(value) {
  if (!value) return null
  return new Date(value).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

// Preheader: hidden text used only for the inbox preview snippet, padded so
// clients don't fall back to rendering the rest of the email body as preview.
function preheader(text) {
  const padded = escapeHtml(text) + '&nbsp;&zwnj;'.repeat(40)
  return `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${padded}</div>`
}

function detailRow(label, value) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:13px;font-weight:600;color:${NAVY};width:180px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-size:14px;color:${BODY_TEXT};vertical-align:top;">${escapeHtml(value)}</td>
    </tr>
  `
}

function itemSummaryRows(items) {
  const counts = new Map()
  for (const item of items) {
    const label = ASSET_TYPE_LABELS[item.asset_type] || item.asset_type
    const key = label
    const qty = clean_quantity(item.quantity)
    const existing = counts.get(key) || []
    if (qty) existing.push(qty)
    counts.set(key, existing)
  }
  return [...counts.entries()].map(([label, quantities]) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};font-size:14px;color:${NAVY};font-weight:600;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};font-size:14px;color:${BODY_TEXT};text-align:right;">${escapeHtml(quantities.join(', ') || '—')}</td>
    </tr>
  `).join('')
}

function clean_quantity(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function buildStatusEmail({ consignment, items, baseUrl }) {
  const {
    reference_number: ref,
    client_name: clientName,
    movement_type: movementType,
    current_status: status,
    current_location_city: city,
    current_location_country: country,
    custody_started_at: custodyStartedAt,
    is_closed: isClosed,
    updated_at: updatedAt,
  } = consignment

  const statusLabel = STATUS_LABELS[status] || status
  const location = formatLocation(city, country) || 'Not yet assigned'
  const headline = statusHeadline(status, ref, city, country)
  const trackUrl = `${baseUrl}/track?ref=${encodeURIComponent(ref)}`
  const bannerUrl = `${baseUrl}/email/status-banner.png`

  const detailRows = [
    detailRow('Reference Number', ref),
    detailRow('Current Status', isClosed ? `${statusLabel} (Closed)` : statusLabel),
    detailRow('Current Location', location),
    detailRow('Last Updated', formatDateTime(updatedAt)),
  ]

  if (movementType === 'custody' && custodyStartedAt) {
    const since = formatDate(custodyStartedAt)
    const days = daysSince(custodyStartedAt)
    detailRows.push(detailRow('In Custody Since', `${since} (${days} ${days === 1 ? 'day' : 'days'})`))
  }

  const html = `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Northgate Vault — Consignment ${escapeHtml(ref)} status update</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  body, table, td { font-family: Inter, Arial, Helvetica, sans-serif; }
  body { margin:0; padding:0; background-color:${LIGHT_GREY}; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  table { border-collapse:collapse; }
  a.btn:hover { opacity:0.9; }

  /* Gmail dark-mode fix: prevent auto-recoloring of the navy brand elements */
  [data-ogsc] .navy-bg, [data-ogsb] .navy-bg { background-color: ${NAVY} !important; }
  [data-ogsc] .navy-deep-bg, [data-ogsb] .navy-deep-bg { background-color: ${NAVY_DEEP} !important; }
  [data-ogsc] .white-text, [data-ogsb] .white-text { color: #ffffff !important; }

  @media only screen and (max-width: 480px) {
    .email-container { width:100% !important; }
    .stack-col { display:block !important; width:100% !important; text-align:center !important; }
    .px-24 { padding-left:20px !important; padding-right:20px !important; }
    .headline { font-size:20px !important; line-height:28px !important; }
    .detail-table td { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${LIGHT_GREY};">
${preheader(headline)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${LIGHT_GREY};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#ffffff;">

        <!-- Illustrated banner -->
        <tr>
          <td>
            <img src="${bannerUrl}" width="600" height="180" alt="Northgate Vault" style="display:block;width:100%;height:auto;max-width:600px;" />
          </td>
        </tr>

        <!-- Navy header bar with wordmark -->
        <tr>
          <td class="navy-deep-bg" style="background-color:${NAVY_DEEP};padding:18px 24px;">
            <span class="white-text" style="color:#ffffff;font-size:16px;font-weight:700;letter-spacing:1px;">NORTHGATE VAULT</span>
          </td>
        </tr>

        <!-- Greeting + status sentence -->
        <tr>
          <td class="px-24" style="padding:32px 40px 8px;">
            <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};">Dear ${escapeHtml(clientName)},</p>
            <p class="headline" style="margin:0;font-size:22px;line-height:30px;font-weight:700;color:${NAVY};">${escapeHtml(headline)}</p>
          </td>
        </tr>

        <!-- Detail block -->
        <tr>
          <td class="px-24" style="padding:24px 40px 8px;">
            <table role="presentation" class="detail-table" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};">
              <tr><td style="padding:16px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${detailRows.join('')}
                </table>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Item summary -->
        ${items.length ? `
        <tr>
          <td class="px-24" style="padding:24px 40px 8px;">
            <p style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${ACCENT};">Consignment Contents</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${itemSummaryRows(items)}
            </table>
          </td>
        </tr>` : ''}

        <!-- Primary button -->
        <tr>
          <td class="px-24" align="center" style="padding:32px 40px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td class="navy-bg" style="background-color:${NAVY};">
                  <a class="btn white-text" href="${trackUrl}" style="display:inline-block;padding:16px 40px;font-size:13px;font-weight:700;letter-spacing:0.5px;color:#ffffff;text-decoration:none;">TRACK CONSIGNMENT</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Secondary link -->
        <tr>
          <td align="center" style="padding:16px 40px 40px;">
            <a href="${baseUrl}/contact" style="font-size:13px;color:${ACCENT};text-decoration:underline;">Contact your account manager</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="navy-deep-bg" style="background-color:${NAVY_DEEP};padding:32px 40px;">
            <p class="white-text" style="margin:0 0 12px;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:1px;">NORTHGATE VAULT</p>
            <p style="margin:0 0 16px;color:#9aa7bd;font-size:12px;line-height:18px;">
              <a href="${baseUrl}/cookie-settings" style="color:#9aa7bd;text-decoration:underline;">Manage email preferences</a>
              &nbsp;·&nbsp;
              <a href="${baseUrl}/privacy-policy" style="color:#9aa7bd;text-decoration:underline;">Privacy Policy</a>
              &nbsp;·&nbsp;
              <a href="${baseUrl}/terms" style="color:#9aa7bd;text-decoration:underline;">Terms</a>
            </p>
            <p style="margin:0;color:#6b7a95;font-size:11px;">© ${new Date().getFullYear()} Northgate Vault. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`

  return {
    subject: `Northgate Vault — Consignment ${ref} status update`,
    html,
  }
}
