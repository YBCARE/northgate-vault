import crypto from 'crypto'
import session from 'express-session'

export function sessionMiddleware() {
  return session({
    name: 'ngv.admin.sid',
    secret: process.env.SESSION_SECRET || 'dev-only-insecure-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
  })
}

// Constant-time comparison that tolerates different-length inputs by comparing
// fixed-length digests instead of the raw strings.
export function passwordsMatch(candidate, expected) {
  if (typeof candidate !== 'string' || typeof expected !== 'string' || !expected) return false
  const a = crypto.createHash('sha256').update(candidate).digest()
  const b = crypto.createHash('sha256').update(expected).digest()
  return crypto.timingSafeEqual(a, b)
}

export function requireAdminApi(req, res, next) {
  if (req.session?.isAdmin) return next()
  return res.status(401).json({ error: 'Not authenticated.' })
}

export function requireAdminPage(req, res, next) {
  if (req.session?.isAdmin) return next()
  return res.redirect('/admin/login')
}
