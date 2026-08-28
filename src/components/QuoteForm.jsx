import { useState } from 'react'
import { services } from '../data/content.js'

const initialState = {
  full_name: '', organization: '', service_type: '', description: '',
  contact_method: '', email: '', phone: '',
}

export default function QuoteForm({ compact = false }) {
  const [values, setValues] = useState(initialState)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('sent')
    } catch (err) {
      setError(err.message || 'We could not send your request. Please try again shortly.')
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line bg-section p-8">
        <h3 className="text-[22px] font-semibold text-navy">Request received.</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          A member of our team will contact you within 24 hours to discuss scope, routing, and documentation requirements.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
      <label className={compact ? '' : 'sm:col-span-2'}>
        <span className="field-label">Full Name</span>
        <input required name="full_name" value={values.full_name} onChange={update('full_name')} className="field" />
      </label>

      <label className={compact ? '' : 'sm:col-span-2'}>
        <span className="field-label">Organization <span className="font-normal text-body/50">(optional)</span></span>
        <input name="organization" value={values.organization} onChange={update('organization')} className="field" />
      </label>

      <label>
        <span className="field-label">Service Required</span>
        <select required name="service_type" value={values.service_type} onChange={update('service_type')} className="field">
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        </select>
      </label>

      <label>
        <span className="field-label">Preferred Contact Method</span>
        <select required name="contact_method" value={values.contact_method} onChange={update('contact_method')} className="field">
          <option value="" disabled>Select preference</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>
      </label>

      <label className="sm:col-span-2">
        <span className="field-label">Description of Requirements</span>
        <textarea required name="description" rows={5} value={values.description} onChange={update('description')} className="field resize-y" />
      </label>

      <label>
        <span className="field-label">Email Address</span>
        <input required type="email" name="email" value={values.email} onChange={update('email')} className="field" />
      </label>

      <label>
        <span className="field-label">Phone Number</span>
        <input required type="tel" name="phone" value={values.phone} onChange={update('phone')} className="field" />
      </label>

      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 border border-alert/40 bg-alert/5 p-3 text-[14px] text-alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={status === 'sending'} className="btn-navy w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto">
          {status === 'sending' ? 'Submitting…' : 'Submit Request'}
        </button>
      </div>
    </form>
  )
}
