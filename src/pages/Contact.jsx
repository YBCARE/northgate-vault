import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import QuoteForm from '../components/QuoteForm.jsx'
import { regions } from '../data/content.js'
import crewLoadingImage from '../assets/contact-crew-loading.jpg'

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description="Speak with the Northgate Vault team about your custody and transport requirements." />
      <PageHeader
        crumb="Contact"
        title="Contact"
        backgroundImage={crewLoadingImage}
        backgroundAlt="Northgate Vault crew loading parcels into a secure transport vehicle"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-[32px] font-bold leading-tight text-navy sm:text-[38px]">Speak with our team</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-body">
              Whether you have a specific engagement in mind or need to understand how our custody protocols apply
              to your circumstances, our team is available to discuss requirements directly.
            </p>

            <div className="mt-9 border-t border-line pt-8">
              <dl className="flex flex-col gap-4">
                <div className="flex justify-between gap-4 text-[15px]">
                  <dt className="font-semibold text-navy">Email</dt>
                  <dd className="text-body">contact@northgatevault.com</dd>
                </div>
                <div className="flex justify-between gap-4 text-[15px]">
                  <dt className="font-semibold text-navy">Global Operations Desk</dt>
                  <dd className="text-body">24/7</dd>
                </div>
                <div className="flex justify-between gap-4 text-[15px]">
                  <dt className="font-semibold text-navy">Response Time</dt>
                  <dd className="text-body">Within 24 hours</dd>
                </div>
              </dl>
            </div>

            <div className="mt-9 border-t border-line pt-8">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.05em] text-navy">Regional Offices</h3>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {regions.map((region) => (
                  <span key={region} className="text-[15px] text-body">{region}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-line bg-section p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  )
}
