import { Link } from 'react-router-dom'

export default function FinalCta() {
  return (
    <section
      className="relative bg-navy-deep bg-cover bg-center py-28 lg:py-32"
      style={{ backgroundImage: "linear-gradient(rgba(7,21,41,0.75), rgba(7,21,41,0.75)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80')" }}
    >
      <div className="shell text-center">
        <h2 className="text-[36px] font-bold leading-tight text-white sm:text-[44px]">Ready to secure what matters most?</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/75">
          Speak with our team about your specific custody and transport requirements.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/request-a-quote" className="btn-white">Request a Quote</Link>
          <Link to="/contact" className="btn-outline-white">Contact Us</Link>
        </div>
      </div>
    </section>
  )
}
