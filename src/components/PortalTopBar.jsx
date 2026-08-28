import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldIcon, ChevronDown, MenuIcon, CloseIcon } from './Icons.jsx'

const navItems = ['Shipments', 'Custody', 'Storage', 'Address Book', 'Users']

function PortalNavItem({ label }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 py-6 text-[13px] font-semibold uppercase tracking-[0.05em] text-white/80 hover:text-white"
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-56 border border-white/10 bg-navy-deep p-4 shadow-lg">
          <p className="text-[13px] leading-relaxed text-white/60">Sign in to access {label.toLowerCase()}.</p>
        </div>
      )}
    </div>
  )
}

export default function PortalTopBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-navy-deep">
      <div className="shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Northgate Vault home">
          <img src="/northgate-vault-icon-white.svg" alt="" className="h-8 w-8" />
          <span className="text-[17px] font-bold tracking-[0.04em] text-white">NORTHGATE VAULT</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Portal navigation">
          {navItems.map((item) => <PortalNavItem key={item} label={item} />)}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
            aria-label="Account"
          >
            <ShieldIcon className="h-5 w-5 text-navy" />
          </span>
        </div>

        <button
          type="button"
          className="text-white lg:hidden"
          aria-label="Toggle portal menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-6 py-4 lg:hidden">
          {navItems.map((item) => (
            <p key={item} className="border-b border-white/10 py-4 text-[13px] font-semibold uppercase tracking-[0.05em] text-white/80">
              {item}
            </p>
          ))}
        </div>
      )}
    </header>
  )
}
