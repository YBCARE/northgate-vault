import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for could not be found." />
      <section className="flex min-h-[60vh] items-center bg-white">
        <div className="shell text-center">
          <p className="label-eyebrow">404</p>
          <h1 className="mt-4 text-[36px] font-bold text-navy">Page not found.</h1>
          <p className="mt-4 text-[17px] text-body">The page you are looking for does not exist.</p>
          <Link to="/" className="btn-navy mt-8 inline-flex">Return Home</Link>
        </div>
      </section>
    </>
  )
}
