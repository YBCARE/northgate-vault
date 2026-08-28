import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import StatsBar from '../components/StatsBar.jsx'
import GlobalReach from '../components/GlobalReach.jsx'
import WhySection from '../components/WhySection.jsx'
import FinalCta from '../components/FinalCta.jsx'
import DualCtaBlock from '../components/DualCtaBlock.jsx'
import IndustryTile from '../components/IndustryTile.jsx'
import { services, industries } from '../data/content.js'
import { TransportIcon, VaultIcon, DocumentIcon, PrivateIcon, TrackingIcon } from '../components/Icons.jsx'

const serviceIcons = {
  'secure-transport': TransportIcon,
  'valuables-custody-storage': VaultIcon,
  'document-custody': DocumentIcon,
  'private-client-services': PrivateIcon,
  'integrated-tracking-platform': TrackingIcon,
}

export default function Home() {
  return (
    <>
      <Seo
        title="Secure Custody & Transport"
        description="Northgate Vault provides secure transport, documented custody, and controlled storage for institutions and private clients across global financial centers."
      />

      <HeroCarousel />

      <section className="bg-white pb-24 pt-16 lg:pb-28 lg:pt-20">
        <div className="shell">
          <p className="label-eyebrow">Who We Are</p>
          <h2 className="mt-4 max-w-3xl text-[36px] font-bold leading-tight text-navy sm:text-[44px]">
            Northgate Vault is built for clients who cannot afford a single point of failure.
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <p className="text-[17px] leading-relaxed text-body">
              We provide secure transport, documented custody, and controlled storage for assets where trust must be
              provable rather than assumed. Every shipment is tracked through a verified chain of custody, every
              handoff is logged and timestamped, and every client relationship is governed by absolute discretion.
            </p>
            <p className="text-[17px] leading-relaxed text-body">
              From financial institutions moving bank notes across borders to private clients relocating
              irreplaceable collections, our protocols do not change — only the scale.
            </p>
          </div>
          <Link to="/about" className="mt-8 inline-block text-[15px] font-semibold text-accent hover:underline">
            Read More About Us →
          </Link>
        </div>
      </section>

      <StatsBar />

      <section className="bg-section py-24 lg:py-28">
        <div className="shell">
          <p className="label-eyebrow">What We Do</p>
          <h2 className="mt-4 text-[36px] font-bold leading-tight text-navy sm:text-[44px]">
            Comprehensive custody, end to end.
          </h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug]
              return (
                <article key={service.slug} className="border border-line bg-white p-8 transition-shadow hover:shadow-lg">
                  <Icon className="h-10 w-10 text-accent" />
                  <h3 className="mt-6 text-[22px] font-semibold text-navy">{service.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{service.short}</p>
                  <Link to={`/services/${service.slug}`} className="mt-4 inline-block text-[14px] font-semibold text-accent hover:underline">
                    Learn more →
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-28">
        <div className="shell">
          <h2 className="text-[36px] font-bold leading-tight text-navy sm:text-[44px]">Industries we serve</h2>
          <div className="mt-14 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => <IndustryTile key={industry.slug} industry={industry} />)}
          </div>
        </div>
      </section>

      <GlobalReach />

      <WhySection />
      <FinalCta />
      <DualCtaBlock />
    </>
  )
}
