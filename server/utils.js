import crypto from 'crypto'

export function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char])
}

export function generateReferenceNumber() {
  const digits = crypto.randomInt(0, 10000000).toString().padStart(7, '0')
  return `NGV-${digits}`
}

export function daysSince(date) {
  if (!date) return null
  const ms = Date.now() - new Date(date).getTime()
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)))
}

export function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value)
}
