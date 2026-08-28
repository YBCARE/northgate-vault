import { whyItems } from '../data/content.js'
import { CustodyBadgeIcon, LiabilityIcon, DiscretionIcon, GlobeIcon } from './Icons.jsx'

const iconMap = { custody: CustodyBadgeIcon, liability: LiabilityIcon, discretion: DiscretionIcon, globe: GlobeIcon }

export default function WhySection() {
  return (
    <section className="bg-section">
      <div className="shell py-24 lg:py-28">
        <h2 className="text-center text-[36px] font-bold leading-tight text-navy sm:text-[44px]">Why Northgate Vault?</h2>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy">
                  <Icon className="h-9 w-9 text-white" />
                </div>
                <h3 className="mt-6 text-[18px] font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 max-w-[220px] text-[15px] leading-relaxed text-body">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
