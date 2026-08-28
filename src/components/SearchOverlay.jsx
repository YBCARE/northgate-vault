import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFocusTrap from './useFocusTrap.js'
import { CloseIcon } from './Icons.jsx'
import { searchIndex } from '../data/searchIndex.js'

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const containerRef = useFocusTrap(onClose)

  const results = query.trim()
    ? searchIndex.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase()))
    : []

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Search Northgate Vault"
      className="fixed inset-0 z-[70] flex flex-col bg-white outline-none"
    >
      <div className="shell flex items-center justify-end py-6">
        <button type="button" onClick={onClose} aria-label="Close search" className="text-navy hover:text-accent">
          <CloseIcon className="h-7 w-7" />
        </button>
      </div>

      <div className="shell flex flex-1 flex-col overflow-y-auto pb-16">
        <div className="mx-auto w-full max-w-2xl">
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Northgate Vault"
            aria-label="Search Northgate Vault"
            className="w-full border-b-2 border-navy bg-transparent py-4 text-[24px] font-semibold text-navy outline-none placeholder:text-body/30 sm:text-[32px]"
          />

          {query.trim() && (
            <ul className="mt-8 flex flex-col divide-y divide-line">
              {results.length ? results.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="block py-4 text-[18px] font-medium text-navy hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              )) : (
                <li className="py-4 text-[15px] text-body/60">No results for "{query}".</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
