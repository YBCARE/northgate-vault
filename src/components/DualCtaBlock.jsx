import { Link } from 'react-router-dom'

export default function DualCtaBlock() {
  return (
    <section className="bg-accent">
      <div className="shell grid gap-10 py-16 text-center sm:grid-cols-2 sm:gap-6 lg:py-20">
        <div className="flex flex-col items-center gap-5">
          <p className="text-[22px] font-bold leading-snug text-white sm:text-[24px]">
            Considering Northgate Vault for your organisation?
          </p>
          <Link to="/request-a-quote" className="btn-white">Let's Talk</Link>
        </div>
        <div className="flex flex-col items-center gap-5 sm:border-l sm:border-white/25">
          <p className="text-[22px] font-bold leading-snug text-white sm:text-[24px]">
            Are you an existing client?
          </p>
          <Link to="/portal" className="btn-white">Client Login</Link>
        </div>
      </div>
    </section>
  )
}
