import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import QuoteForm from '../components/QuoteForm.jsx'

export default function RequestQuote() {
  return (
    <>
      <Seo title="Request a Quote" description="Request a custody or transport quote from Northgate Vault." />
      <PageHeader crumb="Request a Quote" title="Request a Quote" />

      <section className="bg-white py-20 lg:py-24">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-[32px] font-bold leading-tight text-navy sm:text-[38px]">Tell us what you need secured.</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-body">
              Share the details of your custody or transport requirement below. A member of our team will contact
              you within 24 hours to discuss scope, routing, and documentation requirements.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-body">
              Specific security arrangements — routes, facilities, and personnel — are discussed privately once
              your engagement is underway.
            </p>
          </div>

          <div className="border border-line bg-section p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  )
}
