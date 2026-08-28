import { Link } from 'react-router-dom'

export default function AlternatingSection({
  id, label, title, paragraphs = [], bullets = [], image, imageAlt, reverse = false, cta, bg = 'white',
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${bg === 'section' ? 'bg-section' : 'bg-white'}`}>
      <div className="shell py-20 lg:py-24">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div>
            <p className="label-eyebrow">{label}</p>
            <h2 className="mt-4 text-[32px] font-bold leading-tight text-navy sm:text-[38px]">{title}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-[17px] leading-relaxed text-body">{p}</p>
            ))}
            {bullets.length > 0 && (
              <ul className="mt-6 flex flex-col gap-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <Link to={cta.to} className="mt-8 inline-block text-[15px] font-semibold text-accent hover:underline">
                {cta.label} →
              </Link>
            )}
          </div>
          <div>
            <img src={image} alt={imageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
