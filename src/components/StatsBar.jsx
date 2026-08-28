import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/content.js'

function Counter({ value, suffix, isRatio, active }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    if (value === 0) { setDisplay(0); return }
    const duration = 1400
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(progress * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])

  if (isRatio) return <span>{display}/7</span>
  return <span>{display}{suffix}</span>
}

export default function StatsBar() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-navy-deep">
      <div className="shell grid grid-cols-2 gap-y-10 py-16 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/15">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:px-4">
            <p className="text-[44px] font-bold leading-none text-white sm:text-[56px] lg:text-[64px]">
              <Counter value={stat.value} suffix={stat.suffix} isRatio={stat.isRatio} active={active} />
            </p>
            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
