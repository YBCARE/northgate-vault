import { useState } from 'react'
import { CloseIcon } from './Icons.jsx'
import Modal from './Modal.jsx'

const initialState = { name: '', email: '', company: '', message: '' }

function ContactModal({ onClose }) {
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
        body: JSON.stringify({
          full_name: values.name,
          organization: values.company,
          service_type: 'General Inquiry',
          description: values.message,
          contact_method: 'Email',
          email: values.email,
          phone: 'Not provided',
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('sent')
    } catch (err) {
      setError(err.message || 'We could not send your message. Please try again shortly.')
      setStatus('idle')
    }
  }

  return (
    <Modal onClose={onClose} label="Contact form" className="w-full max-w-md p-8">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 text-body/60 hover:text-navy">
        <CloseIcon className="h-5 w-5" />
      </button>

      {status === 'sent' ? (
        <div className="py-6">
          <h3 className="text-[22px] font-semibold text-navy">Message sent.</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body">
            Thank you for reaching out. A member of our team will respond shortly.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-[22px] font-semibold text-navy">Let's talk.</h3>
          <p className="mt-2 text-[14px] text-body">Send a quick message and we'll get back to you.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <label>
              <span className="field-label">Name</span>
              <input required value={values.name} onChange={update('name')} className="field" />
            </label>
            <label>
              <span className="field-label">Email</span>
              <input required type="email" value={values.email} onChange={update('email')} className="field" />
            </label>
            <label>
              <span className="field-label">Company</span>
              <input value={values.company} onChange={update('company')} className="field" />
            </label>
            <label>
              <span className="field-label">Message</span>
              <textarea required rows={4} value={values.message} onChange={update('message')} className="field resize-y" />
            </label>
            {error && <p role="alert" className="border border-alert/40 bg-alert/5 p-3 text-[14px] text-alert">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="btn-navy disabled:cursor-wait disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </>
      )}
    </Modal>
  )
}

export default function LetsTalkButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-navy px-6 py-4 text-[13px] font-bold uppercase tracking-[0.05em] text-white shadow-lg hover:bg-navy-deep sm:bottom-8 sm:right-8"
      >
        Let's Talk
      </button>
      {open && <ContactModal onClose={() => setOpen(false)} />}
    </>
  )
}
