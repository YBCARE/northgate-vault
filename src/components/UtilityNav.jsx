import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon } from './Icons.jsx'
import SearchOverlay from './SearchOverlay.jsx'

export default function UtilityNav() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="hidden bg-navy-deep text-white lg:block">
      <div className="shell flex h-9 items-center justify-end gap-6 text-[13px]">
        <Link to="/about" className="hover:text-white/70">About</Link>
        <Link to="/governance" className="hover:text-white/70">Governance</Link>
        <Link to="/corporate" className="hover:text-white/70">Corporate</Link>
        <Link to="/contact" className="hover:text-white/70">Contact</Link>
        <Link to="/careers" className="hover:text-white/70">Careers</Link>
        <Link to="/locations" className="hover:text-white/70">Locations</Link>
        <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-white/70">
          <SearchIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
