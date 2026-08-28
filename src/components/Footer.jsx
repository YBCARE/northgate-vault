import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { services, industries, regions } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="shell py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Logo light />
            <p className="mt-5 text-[15px] font-semibold text-white">Secure custody. Verified at every step.</p>
            <p className="mt-3 max-w-xs text-[14px] leading-6 text-white/60">
              Operating across global financial centers with institutional-grade chain-of-custody protocols.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-white/50">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-[14px] text-white/80 hover:text-white">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-white/50">Industries</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link to={`/industries/${i.slug}`} className="text-[14px] text-white/80 hover:text-white">{i.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-white/50">Company</h3>
            <ul className="mt-5 flex flex-col gap-3">
              <li><Link to="/about" className="text-[14px] text-white/80 hover:text-white">About</Link></li>
              <li><Link to="/how-it-works" className="text-[14px] text-white/80 hover:text-white">How It Works</Link></li>
              <li><Link to="/contact" className="text-[14px] text-white/80 hover:text-white">Contact</Link></li>
              <li><Link to="/careers" className="text-[14px] text-white/80 hover:text-white">Careers</Link></li>
              <li><Link to="/privacy-policy" className="text-[14px] text-white/80 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[14px] text-white/80 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-white/50">Corporate</h3>
            <ul className="mt-5 flex flex-col gap-3">
              <li><Link to="/governance" className="text-[14px] text-white/80 hover:text-white">Governance</Link></li>
              <li><Link to="/corporate" className="text-[14px] text-white/80 hover:text-white">Corporate</Link></li>
              <li><Link to="/insights" className="text-[14px] text-white/80 hover:text-white">Insights</Link></li>
              <li><Link to="/careers" className="text-[14px] text-white/80 hover:text-white">Careers</Link></li>
              <li><Link to="/cookie-policy" className="text-[14px] text-white/80 hover:text-white">Cookie Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-[14px] text-white/80 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[14px] text-white/80 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center gap-x-6 gap-y-3 py-6">
          <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-white/50">Global Operations</span>
          {regions.map((region) => (
            <Link key={region} to="/locations" className="text-[13px] text-white/70 hover:text-white">
              {region}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-[12px] text-white/50 sm:flex-row">
          <p>© 2026 Northgate Vault. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-white">Terms of Use</Link>
            <span>|</span>
            <Link to="/cookie-settings" className="hover:text-white">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
