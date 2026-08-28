import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
    headline: 'Trust your most valuable assets to a team that never compromises.',
    sub: 'Chain-of-custody transport and storage for institutions and private clients across global financial centers.',
    label: 'Learn More',
    to: '/about',
  },
  {
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1920&q=80',
    headline: 'Every handoff documented. Every movement verified.',
    sub: 'Full audit trails from collection to release — because confidence cannot be improvised.',
    label: 'Our Process',
    to: '/how-it-works',
  },
  {
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1920&q=80',
    headline: 'Discretion is not a feature. It is the foundation.',
    sub: 'We never disclose client identities, asset contents, or movement schedules to any third party.',
    label: 'Private Client Services',
    to: '/services/private-client-services',
  },
  {
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&q=80',
    headline: 'Secure logistics, without borders.',
    sub: 'Operating across major financial centers with vetted partners and institutional-grade protocols.',
    label: 'Request a Quote',
    to: '/request-a-quote',
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[560px] w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.headline}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(7,21,41,0.55)]" />
          <div className="shell absolute inset-0 flex items-end pb-40 sm:pb-28">
            <div className="max-w-[700px]">
              <h1 className="text-[36px] font-bold leading-[1.1] text-white sm:text-[52px] lg:text-[64px]">
                {slide.headline}
              </h1>
              <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-white/85 sm:text-[18px]">
                {slide.sub}
              </p>
              <Link to={slide.to} className="btn-white mt-8">
                {slide.label} →
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="shell absolute bottom-24 left-0 right-0 flex gap-3 sm:bottom-8">
        {slides.map((slide, i) => (
          <button
            key={slide.headline}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  )
}
