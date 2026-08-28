import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import FinalCta from '../components/FinalCta.jsx'

const sustainability = [
  {
    title: 'Environmental Responsibility',
    text: 'We look for practical ways to reduce the environmental footprint of our operations, from route planning that limits unnecessary transit to facility choices that account for energy use. This is an ongoing effort we are working to formalize further as our operations grow, not a finished program.',
  },
  {
    title: 'Workforce Standards',
    text: 'Personnel across our operations and partner network are expected to work in conditions that meet applicable labor law and basic standards of safety and fair treatment. We take this seriously in how we select and manage partner relationships, not only within our own direct operations.',
  },
  {
    title: 'Community Impact',
    text: 'We aim to be a responsible presence in the communities where we operate, including how we hire locally and engage with local partners and authorities. This is an area we intend to develop further as the company grows, rather than a set of completed initiatives.',
  },
]

export default function Corporate() {
  return (
    <>
      <Seo title="Corporate" description="Corporate information about Northgate Vault, a privately held secure custody and transport company." />

      <section
        className="relative flex min-h-[360px] items-end bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(7,21,41,0.7), rgba(7,21,41,0.7)), url('https://images.pexels.com/photos/12700822/pexels-photo-12700822.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
      >
        <div className="shell py-16">
          <p className="text-[13px] text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> / <span className="text-white">Corporate</span>
          </p>
          <h1 className="mt-4 text-[40px] font-bold leading-tight text-white sm:text-[48px]">Corporate</h1>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <h2 className="text-[32px] font-bold leading-tight text-navy sm:text-[38px]">Our Business</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <p className="text-[17px] leading-relaxed text-body">
              Northgate Vault provides secure transport, documented custody, and controlled storage for
              institutions and private clients. Our operating model is built around a single standard applied
              consistently across every engagement: a verified, documented chain of custody from collection to
              release, regardless of the asset class or the scale of the movement.
            </p>
            <p className="text-[17px] leading-relaxed text-body">
              We serve banking and financial institutions, dealers and collectors in precious metals and jewelry,
              legal practices requiring document custody, and private clients with individual custody needs.
              Engagements are coordinated through a network of secure facilities and vetted transport partners
              across the regions we operate in.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-section py-20 lg:py-24">
        <div className="shell">
          <h2 className="text-[32px] font-bold leading-tight text-navy sm:text-[38px]">Leadership</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body">
            Northgate Vault's leadership team is directly involved in the engagements we take on and is available
            to discuss specific requirements with institutional clients and partners. For leadership-level
            enquiries, please get in touch directly rather than through a general contact form.
          </p>
          <Link to="/contact" className="mt-6 inline-block text-[15px] font-semibold text-accent hover:underline">
            Contact our team →
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <h2 className="text-[32px] font-bold leading-tight text-navy sm:text-[38px]">Investor Enquiries</h2>
          <div className="mt-6 max-w-2xl border border-line p-8">
            <p className="text-[17px] leading-relaxed text-body">
              Northgate Vault is a privately held company. We do not publish financial statements. Investment and
              partnership enquiries may be directed to{' '}
              <a href="mailto:investors@northgatevault.com" className="font-semibold text-accent hover:underline">
                investors@northgatevault.com
              </a>.
            </p>
            <a href="mailto:investors@northgatevault.com" className="btn-navy mt-6 inline-flex">
              Contact Investor Relations
            </a>
          </div>
        </div>
      </section>

      <section className="bg-section py-20 lg:py-24">
        <div className="shell">
          <h2 className="text-[32px] font-bold leading-tight text-navy sm:text-[38px]">Sustainability & Responsibility</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {sustainability.map((item) => (
              <div key={item.title}>
                <h3 className="text-[19px] font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
