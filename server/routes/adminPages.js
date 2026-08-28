import { Router } from 'express'
import { requireAdminPage } from '../auth.js'
import { clean } from '../utils.js'
import { listConsignments, fetchConsignmentDetail } from '../queries.js'
import { loginPage, dashboardPage, createPage, detailPage, editPage } from '../views.js'

const router = Router()

router.get('/', (req, res) => res.redirect('/admin/dashboard'))

router.get('/login', (req, res) => {
  if (req.session?.isAdmin) return res.redirect('/admin/dashboard')
  res.send(loginPage({ error: clean(req.query.error) }))
})

router.use(requireAdminPage)

router.get('/dashboard', async (req, res) => {
  const filters = {
    search: clean(req.query.search),
    status: clean(req.query.status),
    movementType: clean(req.query.movement_type),
    openState: clean(req.query.open_state),
  }
  try {
    const consignments = await listConsignments(filters)
    res.send(dashboardPage({ consignments, filters, flash: clean(req.query.flash), flashType: clean(req.query.flashType) }))
  } catch (error) {
    console.error('Dashboard load failed:', error)
    res.status(500).send('Could not load dashboard.')
  }
})

router.get('/consignments/new', (req, res) => {
  res.send(createPage({ flash: clean(req.query.flash), flashType: clean(req.query.flashType) }))
})

router.get('/consignments/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(404).send('Not found.')

  try {
    const detail = await fetchConsignmentDetail(id)
    if (!detail) return res.status(404).send('Consignment not found.')
    res.send(detailPage({ ...detail, flash: clean(req.query.flash), flashType: clean(req.query.flashType) }))
  } catch (error) {
    console.error('Detail load failed:', error)
    res.status(500).send('Could not load consignment.')
  }
})

router.get('/consignments/:id/edit', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(404).send('Not found.')

  try {
    const detail = await fetchConsignmentDetail(id)
    if (!detail) return res.status(404).send('Consignment not found.')
    res.send(editPage({ consignment: detail.consignment, flash: clean(req.query.flash), flashType: clean(req.query.flashType) }))
  } catch (error) {
    console.error('Edit page load failed:', error)
    res.status(500).send('Could not load consignment.')
  }
})

export default router
