import { Link } from 'react-router-dom'

export default function PageHeader({ crumb, crumbs, title, subtitle, backgroundImage, backgroundAlt }) {
  return (
    <section className={`relative flex min-h-[300px] items-center overflow-hidden ${backgroundImage ? '' : 'bg-navy-deep'}`}>
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt={backgroundAlt || ''}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(7,21,41,0.78)' }} />
        </>
      )}
      <div className="shell relative py-16">
        <p className="text-[13px] text-white/60">
          <Link to="/" className="hover:text-white">Home</Link>
          {crumbs
            ? crumbs.map((c) => (
              <span key={c.label}>
                {' '}/{' '}
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
              </span>
            ))
            : <> / <span className="text-white">{crumb}</span></>}
        </p>
        <h1 className="mt-4 text-[40px] font-bold leading-tight text-white sm:text-[48px]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">{subtitle}</p>}
      </div>
    </section>
  )
}
