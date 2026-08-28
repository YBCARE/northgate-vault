import { Link } from 'react-router-dom'
import aircraftImage from '../assets/global-reach-aircraft.jpg'

export default function GlobalReach() {
  return (
    <section className="relative flex min-h-[420px] items-center overflow-hidden py-20 sm:min-h-[460px] lg:min-h-[500px] lg:py-24">
      <img
        src={aircraftImage}
        alt="Northgate Vault branded cargo aircraft on an airport apron"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(7,21,41,0.6)' }} />
      <div className="shell relative">
        <p className="label-eyebrow">Global Reach</p>
        <h2 className="mt-4 max-w-2xl text-[36px] font-bold leading-tight text-white sm:text-[44px]">
          Coordinated movement across borders.
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/85">
          International consignments carry their own documentation and regulatory requirements at every border
          they cross. We coordinate customs paperwork, permits, and carrier handoffs ahead of departure, so the
          chain of custody stays continuous from origin to destination rather than breaking at the border.
        </p>
        <Link to="/services" className="btn-outline-white mt-8">OUR SERVICES →</Link>
      </div>
    </section>
  )
}
