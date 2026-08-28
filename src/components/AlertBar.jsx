import { useState } from 'react'
import { WarningIcon, CloseIcon } from './Icons.jsx'

export default function AlertBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative bg-section">
      <div className="shell flex items-center justify-center gap-2 py-2.5 pr-10 text-center">
        <WarningIcon className="h-4 w-4 shrink-0 text-alert" />
        <p className="text-[13px] font-medium text-alert">
          Client Notice: Updated international custody documentation requirements — effective immediately.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss notice"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-body/60 hover:text-navy"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
