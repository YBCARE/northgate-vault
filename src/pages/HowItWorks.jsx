import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Stage from '../components/Stage.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { stages } from '../data/stages.js'

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works"
        description="From first consultation to final delivery, every stage of a Northgate Vault engagement is documented."
      />
      <PageHeader
        crumb="How It Works"
        title="How It Works"
        subtitle="From first contact to final release, every stage is documented."
      />

      {stages.map((stage, i) => (
        <Stage key={stage.number} stage={stage} reverse={i % 2 === 1} bg={i % 2 === 0 ? 'white' : 'section'} />
      ))}

      <FinalCta />
    </>
  )
}
