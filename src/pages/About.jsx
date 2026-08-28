import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatsBar from '../components/StatsBar.jsx'
import FinalCta from '../components/FinalCta.jsx'
import DualCtaBlock from '../components/DualCtaBlock.jsx'
import { regions } from '../data/content.js'
import { ShieldIcon, TrackingIcon, DiscretionIcon } from '../components/Icons.jsx'
import vaultDoorImage from '../assets/about-vault-door.jpg'

const values = [
  { title: 'Integrity', icon: ShieldIcon, text: 'We do what we say we will do, document what we do, and stand behind the record when it is examined.' },
  { title: 'Precision', icon: TrackingIcon, text: 'Controls are matched to the specific risk of each engagement, not applied as a generic template.' },
  { title: 'Discretion', icon: DiscretionIcon, text: 'Client identity, asset contents, and movement schedules are shared only with those directly responsible.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Northgate Vault exists for clients who cannot afford a single compromise in the custody of their assets."
      />
      <PageHeader
        crumb="About"
        title="About Northgate Vault"
        backgroundImage={vaultDoorImage}
        backgroundAlt="Northgate Vault steel vault door in a modern facility"
      />

      <section className="bg-white py-24 lg:py-28">
        <div className="shell">
          <h2 className="max-w-3xl text-[32px] font-bold leading-tight text-navy sm:text-[40px]">
            We exist for clients who cannot afford a single compromise in the custody of their assets.
          </h2>
        </div>
      </section>

      <section className="bg-section py-20 lg:py-24">
        <div className="shell">
          <p className="label-eyebrow">Our Approach</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <p className="text-[17px] leading-relaxed text-body">
              Northgate Vault was built on a simple premise: custody is only as strong as its weakest documented
              step. We do not treat chain-of-custody as paperwork attached after the fact — it is the process
              itself, built into collection, transport, storage, and release from the first consultation onward.
            </p>
            <p className="text-[17px] leading-relaxed text-body">
              That approach scales without changing. A financial institution moving bank notes across a border and
              a private client relocating a single collection are held to the same standard of verification,
              documentation, and discretion. Only the scale of the engagement differs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <value.icon className="h-10 w-10 text-accent" />
                <h3 className="mt-5 text-[22px] font-semibold text-navy">{value.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <p className="label-eyebrow">Global Operations</p>
          <h2 className="mt-4 text-[32px] font-bold leading-tight text-navy sm:text-[38px]">
            Operating across major financial centers.
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {regions.map((region) => (
              <span key={region} className="text-[15px] font-medium text-body">{region}</span>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <DualCtaBlock />
    </>
  )
}
