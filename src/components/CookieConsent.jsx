import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal.jsx'
import { CloseIcon } from './Icons.jsx'

function Toggle({ checked, onChange, disabled, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-navy' : 'bg-line'} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  )
}

function PreferencesModal({ onClose, onSave }) {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  return (
    <Modal onClose={onClose} label="Cookie preferences" className="w-full max-w-lg p-8">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 text-body/60 hover:text-navy">
        <CloseIcon className="h-5 w-5" />
      </button>

      <h3 className="text-[22px] font-semibold text-navy">Manage Cookie Preferences</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-body">
        Choose which categories of cookies you allow. Strictly necessary cookies keep the site functioning and
        cannot be disabled.
      </p>

      <div className="mt-6 flex flex-col divide-y divide-line border-y border-line">
        <div className="flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-[15px] font-semibold text-navy">Strictly Necessary</p>
            <p className="mt-1 text-[13px] text-body/70">Required for core site functionality. Always active.</p>
          </div>
          <Toggle checked disabled onChange={() => {}} label="Strictly Necessary cookies (always on)" />
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-[15px] font-semibold text-navy">Analytics</p>
            <p className="mt-1 text-[13px] text-body/70">Helps us understand how the site is used.</p>
          </div>
          <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-[15px] font-semibold text-navy">Marketing</p>
            <p className="mt-1 text-[13px] text-body/70">Used to tailor communications to your interests.</p>
          </div>
          <Toggle checked={marketing} onChange={setMarketing} label="Marketing cookies" />
        </div>
      </div>

      <button type="button" onClick={onSave} className="btn-navy mt-6 w-full">
        Save Preferences
      </button>
    </Modal>
  )
}

export default function CookieConsent() {
  const [dismissed, setDismissed] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  if (dismissed) return null

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white">
        <div className="shell flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[14px] leading-relaxed text-body">
            This website uses cookies to enhance user experience and analyse site traffic. We do not sell personal
            information. Further information is available in our{' '}
            <Link to="/cookie-policy" className="font-semibold text-accent hover:underline">Cookie Policy</Link>.
          </p>
          <div className="flex w-full shrink-0 flex-wrap items-center gap-3 sm:w-auto">
            <button type="button" onClick={() => setShowPreferences(true)} className="btn-outline-navy">
              Manage Preferences
            </button>
            <button type="button" onClick={() => setDismissed(true)} className="btn-navy">
              Accept Cookies
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss cookie notice"
              className="text-body/60 hover:text-navy"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showPreferences && (
        <PreferencesModal
          onClose={() => setShowPreferences(false)}
          onSave={() => { setShowPreferences(false); setDismissed(true) }}
        />
      )}
    </>
  )
}
