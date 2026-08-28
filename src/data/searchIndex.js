import { services, industries } from './content.js'
import { insights } from './insights.js'

const pages = [
  { title: 'Home', to: '/' },
  { title: 'Services', to: '/services' },
  { title: 'Industries', to: '/industries' },
  { title: 'How It Works', to: '/how-it-works' },
  { title: 'Insights', to: '/insights' },
  { title: 'About', to: '/about' },
  { title: 'Track Shipment', to: '/track' },
  { title: 'Client Portal', to: '/portal' },
  { title: 'Contact', to: '/contact' },
  { title: 'Request a Quote', to: '/request-a-quote' },
  { title: 'Governance & Compliance', to: '/governance' },
  { title: 'Corporate', to: '/corporate' },
  { title: 'Careers', to: '/careers' },
  { title: 'Locations', to: '/locations' },
]

const serviceEntries = services.map((s) => ({ title: s.name, to: `/services/${s.slug}` }))
const industryEntries = industries.map((i) => ({ title: i.name, to: `/industries/${i.slug}` }))
const insightEntries = insights.map((a) => ({ title: a.title, to: `/insights/${a.slug}` }))

export const searchIndex = [...pages, ...serviceEntries, ...industryEntries, ...insightEntries]
