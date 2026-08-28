import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Modal from '../components/Modal.jsx'
import DualCtaBlock from '../components/DualCtaBlock.jsx'
import { CloseIcon } from '../components/Icons.jsx'
import { policies } from '../data/policies.js'
import governanceImage from '../assets/governance-contract-signing.jpg'

function PolicyModal({ policy, onClose }) {
  return (
    <Modal onClose={onClose} label={policy.name} className="w-full max-w-xl p-8">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 text-body/60 hover:text-navy">
        <CloseIcon className="h-5 w-5" />
      </button>
      <h3 className="pr-8 text-[24px] font-bold text-navy">{policy.name}</h3>
      <div className="mt-5 flex flex-col gap-4">
        {policy.body.map((paragraph, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-body">{paragraph}</p>
        ))}
      </div>
    </Modal>
  )
}

export default function Governance() {
  const [activeSlug, setActiveSlug] = useState(null)
  const activePolicy = policies.find((p) => p.slug === activeSlug)

  return (
    <>
      <Seo
        title="Governance & Compliance"
        description="Northgate Vault operates under formal policies governing conduct, data handling, and regulatory compliance."
      />
      <PageHeader
        crumb="Governance"
        title="Governance & Compliance"
        subtitle="Northgate Vault operates under formal policies governing conduct, data handling, and regulatory compliance across every jurisdiction in which we operate."
        backgroundImage={governanceImage}
        backgroundAlt="Contract document being reviewed and signed"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy) => (
              <article key={policy.slug} className="flex flex-col border border-line">
                <div className="relative aspect-[4/3]">
                  <img src={policy.image} alt={policy.name} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-navy/55" />
                  <h3 className="absolute inset-x-0 bottom-0 p-5 text-[18px] font-bold leading-snug text-white">{policy.name}</h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-[15px] leading-relaxed text-body">{policy.summary}</p>
                  <button type="button" onClick={() => setActiveSlug(policy.slug)} className="btn-outline-navy mt-6">
                    View Policy
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section py-16 lg:py-20">
        <div className="shell">
          <h2 className="text-[28px] font-bold text-navy">Regulatory Compliance</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-body">
            Northgate Vault structures its operations to comply with applicable local and international laws in
            each jurisdiction it serves, including regulations governing the movement, storage, and custody of
            high-value assets, data protection, and anti-money laundering obligations. Requirements vary by
            jurisdiction and by asset class, and are reviewed as part of the consultation process for every
            engagement.
          </p>
        </div>
      </section>

      <DualCtaBlock />

      {activePolicy && <PolicyModal policy={activePolicy} onClose={() => setActiveSlug(null)} />}
    </>
  )
}
