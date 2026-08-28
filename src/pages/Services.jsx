import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import AlternatingSection from '../components/AlternatingSection.jsx'
import WhySection from '../components/WhySection.jsx'
import FinalCta from '../components/FinalCta.jsx'
import DualCtaBlock from '../components/DualCtaBlock.jsx'
import { serviceDetails } from '../data/serviceDetails.js'

export default function Services() {
  const { slug } = useParams()

  useEffect(() => {
    if (!slug) return
    const el = document.getElementById(slug)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
  }, [slug])

  return (
    <>
      <Seo
        title="Our Services"
        description="Secure transport, custody, storage, and document handling for institutions and private clients."
      />
      <PageHeader
        crumb="Services"
        title="Our Services"
        subtitle="Custody and transport solutions built around the asset, the risk, and the people responsible for it."
      />

      {serviceDetails.map((service, i) => (
        <AlternatingSection
          key={service.slug}
          id={service.slug}
          label="What We Do"
          title={service.name}
          paragraphs={service.paragraphs}
          bullets={service.bullets}
          image={service.image}
          imageAlt={service.name}
          reverse={i % 2 === 1}
          bg={i % 2 === 0 ? 'white' : 'section'}
          cta={{ label: 'Request a Quote', to: '/request-a-quote' }}
        />
      ))}

      <WhySection />
      <FinalCta />
      <DualCtaBlock />
    </>
  )
}
