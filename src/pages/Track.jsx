import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import truckImage from '../assets/secure-transport-truck.jpg'
import { STATUS_LABELS, ASSET_TYPE_LABELS, formatLocation } from '../data/trackingLabels.js'

const NOT_FOUND_MESSAGE = 'No consignment found for this reference. Please verify the number or contact your account manager.'

function formatDate(value) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-US', { dateStyle: 'long' })
}

function formatDateTime(value) {
  if (!value) return null
  return new Date(value).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}

function ResultPanel({ result, onReset }) {
  const statusLabel = STATUS_LABELS[result.current_status] || result.current_status
  const location = formatLocation(result.current_location?.city, result.current_location?.country)

  return (
    <div className="border border-line bg-white p-8 sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.05em] text-body/60">Reference Number</p>
          <p className="mt-1 text-[22px] font-bold text-navy">{result.reference_number}</p>
        </div>
        <span className={`px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.04em] ${result.is_closed ? 'bg-line text-body' : 'bg-navy text-white'}`}>
          {result.is_closed ? 'Closed' : statusLabel}
        </span>
      </div>

      {result.is_closed && (
        <div className="mt-6 border border-line bg-section p-4 text-[14px] text-body">
          This consignment is closed.
        </div>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.05em] text-body/60">Current Status</p>
          <p className="mt-1 text-[15px] font-semibold text-navy">{statusLabel}</p>
        </div>
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.05em] text-body/60">Current Location</p>
          <p className="mt-1 text-[15px] font-semibold text-navy">{location || 'Not yet assigned'}</p>
        </div>
      </div>

      {result.movement_type === 'custody' && result.custody_started_at && (
        <p className="mt-6 border-l-2 border-accent pl-4 text-[14px] leading-relaxed text-body">
          In custody since {formatDate(result.custody_started_at)} — {result.custody_duration_days} {result.custody_duration_days === 1 ? 'day' : 'days'}
        </p>
      )}

      {result.items?.length > 0 && (
        <div className="mt-8">
          <p className="label-eyebrow">Items</p>
          <div className="mt-3 divide-y divide-line border-y border-line">
            {result.items.map((item, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <p className="text-[14px] text-body">
                  <span className="font-semibold text-navy">{ASSET_TYPE_LABELS[item.asset_type] || item.asset_type}</span>
                  {item.description ? ` — ${item.description}` : ''}
                </p>
                {item.quantity && <p className="text-[13px] text-body/60">{item.quantity}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {result.events?.length > 0 && (
        <div className="mt-8">
          <p className="label-eyebrow">Event History</p>
          <ul className="mt-5 border-l-2 border-line pl-6">
            {result.events.map((ev, i) => {
              const evLocation = formatLocation(ev.location_city, ev.location_country)
              return (
                <li key={i} className="relative pb-7 last:pb-0">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-white bg-navy ring-1 ring-line" />
                  <p className="text-[15px] font-semibold text-navy">{STATUS_LABELS[ev.status] || ev.status}</p>
                  <p className="mt-0.5 text-[13px] text-body/60">
                    {formatDateTime(ev.occurred_at)}{evLocation ? ` · ${evLocation}` : ''}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <button type="button" onClick={onReset} className="mt-8 text-[14px] font-semibold text-accent hover:underline">
        ← Track another consignment
      </button>
    </div>
  )
}

export default function Track() {
  const [searchParams] = useSearchParams()
  const [reference, setReference] = useState(searchParams.get('ref') || '')
  const [status, setStatus] = useState('idle') // idle | loading | error | success
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const runLookup = useCallback(async (rawRef) => {
    const trimmed = rawRef.trim()
    if (!trimmed) return

    setStatus('loading')
    setError('')

    try {
      const response = await fetch(`/api/track/${encodeURIComponent(trimmed)}`)
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setResult(null)
        setError(data.error || NOT_FOUND_MESSAGE)
        setStatus('error')
        return
      }

      setResult(data)
      setStatus('success')
    } catch {
      setResult(null)
      setError('We could not complete this lookup. Please try again shortly.')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const prefilled = searchParams.get('ref')
    if (prefilled) runLookup(prefilled)
    // Only run for the reference present on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = (e) => {
    e.preventDefault()
    runLookup(reference)
  }

  const reset = () => {
    setStatus('idle')
    setResult(null)
    setError('')
    setReference('')
  }

  return (
    <>
      <Seo title="Track Shipment" description="Track a consignment currently in Northgate Vault custody." />

      <section className="relative flex min-h-[300px] items-center overflow-hidden">
        <img
          src={truckImage}
          alt="Northgate Vault secure transport vehicle"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(7,21,41,0.75)' }} />
        <div className="shell relative py-16">
          <p className="text-[13px] text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Track Shipment</span>
          </p>
          <h1 className="mt-4 text-[40px] font-bold leading-tight text-white sm:text-[48px]">Track Shipment</h1>
        </div>
      </section>

      <section className="bg-section py-24 lg:py-28">
        <div className="shell flex justify-center">
          <div className={`w-full ${status === 'success' ? 'max-w-2xl' : 'max-w-md'}`}>
            {status !== 'success' && (
              <div className="border border-line bg-white p-10">
                <h2 className="text-[26px] font-bold text-navy">Track your consignment</h2>
                <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
                  <label>
                    <span className="field-label">Consignment Reference Number</span>
                    <input
                      required
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="field"
                      placeholder="e.g. NGV-0000000"
                    />
                  </label>
                  <button type="submit" className="btn-navy disabled:cursor-wait disabled:opacity-60" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Tracking…' : 'Track'}
                  </button>
                </form>

                {status === 'error' && (
                  <p role="alert" className="mt-5 border border-line bg-section p-4 text-[14px] leading-relaxed text-body">
                    {error}
                  </p>
                )}

                <p className="mt-6 text-[13px] leading-relaxed text-body/70">
                  Consignment tracking is available to verified clients only. If you do not have a reference number,
                  please contact your account manager.
                </p>
              </div>
            )}

            {status === 'success' && result && <ResultPanel result={result} onReset={reset} />}
          </div>
        </div>
      </section>
    </>
  )
}
