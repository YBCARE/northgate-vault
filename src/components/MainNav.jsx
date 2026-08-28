import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { services, industries } from '../data/content.js'
import { ChevronDown, MenuIcon, CloseIcon } from './Icons.jsx'

function DesktopDropdown({ label, to, items, basePath }) {
  const [open, setOpen] = useState(false)

  const closeOnBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
  }

  const closeOnEscape = (e) => {
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={closeOnBlur}
      onKeyDown={closeOnEscape}
    >
      <div className="flex items-center gap-1 py-8">
        <Link to={to} className="nav-link text-navy hover:text-accent">
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? 'Close' : 'Open'} ${label} menu`}
          onClick={() => setOpen((o) => !o)}
          className="text-navy hover:text-accent"
        >
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 border border-line bg-white p-8 shadow-lg">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {items.map((item) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                className="text-[14px] font-medium text-navy hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileAccordion({ label, items, basePath, onNavigate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold uppercase tracking-[0.02em] text-navy"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-3 pb-4 pl-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`${basePath}/${item.slug}`}
              className="text-[14px] font-medium text-body"
              onClick={onNavigate}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-white transition-shadow ${scrolled ? 'shadow-md' : ''}`}
    >
      <nav className="shell flex h-20 items-center justify-between" aria-label="Main navigation">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          <DesktopDropdown label="Services" to="/services" items={services} basePath="/services" />
          <DesktopDropdown label="Industries" to="/industries" items={industries} basePath="/industries" />
          <Link to="/how-it-works" className="nav-link text-navy hover:text-accent">How It Works</Link>
          <Link to="/insights" className="nav-link text-navy hover:text-accent">Insights</Link>
          <Link to="/about" className="nav-link text-navy hover:text-accent">About</Link>
          <Link to="/track" className="nav-link text-navy hover:text-accent">Track Shipment</Link>
          <Link to="/portal" className="btn-navy">Client Login</Link>
        </div>

        <button
          type="button"
          className="text-navy lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-30 overflow-y-auto bg-white px-6 py-4 lg:hidden">
          <MobileAccordion label="Services" items={services} basePath="/services" onNavigate={() => setMobileOpen(false)} />
          <MobileAccordion label="Industries" items={industries} basePath="/industries" onNavigate={() => setMobileOpen(false)} />
          <Link to="/how-it-works" onClick={() => setMobileOpen(false)} className="block border-b border-line py-4 text-[15px] font-semibold uppercase tracking-[0.02em] text-navy">How It Works</Link>
          <Link to="/insights" onClick={() => setMobileOpen(false)} className="block border-b border-line py-4 text-[15px] font-semibold uppercase tracking-[0.02em] text-navy">Insights</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="block border-b border-line py-4 text-[15px] font-semibold uppercase tracking-[0.02em] text-navy">About</Link>
          <Link to="/track" onClick={() => setMobileOpen(false)} className="block border-b border-line py-4 text-[15px] font-semibold uppercase tracking-[0.02em] text-navy">Track Shipment</Link>
          <Link to="/portal" onClick={() => setMobileOpen(false)} className="btn-navy mt-6 w-full">Client Login</Link>
        </div>
      )}
    </header>
  )
}
