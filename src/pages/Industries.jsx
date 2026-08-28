import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import AlternatingSection from '../components/AlternatingSection.jsx'
import FinalCta from '../components/FinalCta.jsx'
import DualCtaBlock from '../components/DualCtaBlock.jsx'
import { industryDetails } from '../data/industryDetails.js'

export default function Industries() {
  const { slug } = useParams()

  useEffect(() => {
    if (!slug) return
    const el = document.getElementById(slug)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
  }, [slug])

  return (
    <>
      <Seo
        title="Industries We Serve"
        description="Custody and transport solutions tailored to the specific requirements of banking, jewelry, precious metals, legal, fine art, and private clients."
      />
      <PageHeader
        crumb="Industries"
        title="Industries we serve"
        subtitle="Custody requirements differ by sector — by asset, by regulation, and by what is at stake if a chain of custody breaks down."
      />

      <section className="bg-white py-16">
        <div className="shell">
          <p className="max-w-3xl text-[17px] leading-relaxed text-body">
            A bank moving bank notes and a collector relocating a single painting face entirely different risks,
            even when the underlying service — secure transport, documented custody — looks the same on paper.
            We build each engagement around the specific requirements of the sector it serves.
          </p>
        </div>
      </section>

      {industryDetails.map((industry, i) => (
        <AlternatingSection
          key={industry.slug}
          id={industry.slug}
          label="Industry"
          title={industry.name}
          paragraphs={[industry.text]}
          image={industry.image}
          imageAlt={industry.name}
          reverse={i % 2 === 1}
          bg={i % 2 === 0 ? 'white' : 'section'}
        />
      ))}

      <FinalCta />
      <DualCtaBlock />
    </>
  )
}
