import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PortalTopBar from '../components/PortalTopBar.jsx'
import { UserIcon, EyeIcon, EyeOffIcon } from '../components/Icons.jsx'

const ACCESS_MESSAGE = 'Portal access is provisioned by your account manager. Please contact us to request credentials.'

function TrackCard() {
  const [reference, setReference] = useState('')
  const [manifest, setManifest] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canTrack = reference.trim() !== '' || manifest.trim() !== ''

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white p-8">
      <h2 className="text-center text-[22px] font-bold text-navy">Track Consignment</h2>

      {submitted ? (
        <p role="status" className="mt-5 border border-line bg-section p-4 text-[14px] leading-relaxed text-body">
          No consignment found for this reference. Please verify the number or contact your account manager.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
          <label>
            <span className="field-label">Consignment Reference</span>
            <input value={reference} onChange={(e) => setReference(e.target.value)} className="field" placeholder="e.g. NGV-0000000" />
          </label>

          <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-body/40">
            <span className="h-px flex-1 bg-line" />
            OR
            <span className="h-px flex-1 bg-line" />
          </div>

          <label>
            <span className="field-label">Custody Manifest No.</span>
            <input value={manifest} onChange={(e) => setManifest(e.target.value)} className="field" placeholder="e.g. CM-0000000" />
          </label>

          <button type="submit" disabled={!canTrack} className="btn-navy w-full disabled:cursor-not-allowed disabled:opacity-40">
            Track
          </button>
        </form>
      )}
    </div>
  )
}

function SignInCard() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white p-8">
      <h2 className="text-center text-[22px] font-bold text-navy">Sign in to Northgate Portal</h2>

      {submitted ? (
        <p role="status" className="mt-5 border border-line bg-section p-4 text-[14px] leading-relaxed text-body">
          {ACCESS_MESSAGE}
        </p>
      ) : (
        <>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
            <label className="relative block">
              <span className="field-label">Username</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="field pr-11" autoComplete="username" />
              <UserIcon className="pointer-events-none absolute bottom-3 right-3.5 h-4 w-4 text-body/40" />
            </label>

            <label className="relative block">
              <span className="field-label">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                className="field pr-11"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute bottom-2.5 right-2.5 p-0.5 text-body/40 hover:text-navy"
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </label>

            <button type="submit" className="btn-navy w-full">Sign In</button>
          </form>

          <div className="mt-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-body/40">
            <span className="h-px flex-1 bg-line" />
            OR
            <span className="h-px flex-1 bg-line" />
          </div>

          <Link to="/request-a-quote" className="btn-outline-navy mt-5 w-full">Request Portal Access</Link>

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="mt-5 block w-full text-center text-[14px] font-semibold text-accent hover:underline"
          >
            Forgot password?
          </button>
        </>
      )}
    </div>
  )
}

export default function Portal() {
  return (
    <>
      <Seo title="Client Portal" description="Sign in to the Northgate Vault client portal or track a consignment." />
      <PortalTopBar />

      <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-3">
        <div
          className="relative hidden bg-cover bg-center lg:col-span-2 lg:flex lg:flex-col lg:justify-end"
          style={{ backgroundImage: "linear-gradient(rgba(10,31,68,0.6), rgba(10,31,68,0.6)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80')" }}
        >
          <div className="p-12">
            <p className="text-[26px] font-bold leading-tight text-white">Secure custody,<br />always verified.</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-section p-6 sm:p-10 lg:col-span-1 lg:py-16">
          <TrackCard />
          <SignInCard />
        </div>
      </div>
    </>
  )
}
