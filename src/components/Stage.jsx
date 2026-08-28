export default function Stage({ stage, reverse, bg }) {
  return (
    <section className={`relative overflow-hidden ${bg === 'section' ? 'bg-section' : 'bg-white'}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-[220px] font-bold leading-none text-line/60 sm:text-[280px] ${reverse ? 'right-0 lg:-right-6' : 'left-0 lg:-left-6'}`}
      >
        {stage.number}
      </span>

      <div className="shell relative py-20 lg:py-24">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className="relative">
            <p className="label-eyebrow">Stage {stage.number}</p>
            <h2 className="mt-4 text-[32px] font-bold leading-tight text-navy sm:text-[38px]">{stage.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-body">{stage.text}</p>
            <div className="mt-7 border border-line bg-white p-6">
              <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-navy">Documentation produced at this stage</p>
              <ul className="mt-3 flex flex-col gap-2">
                {stage.docs.map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-[14px] leading-relaxed text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative">
            <img src={stage.image} alt={stage.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
