import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function SimplePage({ crumb, title, text, backgroundImage, backgroundAlt }) {
  return (
    <>
      <Seo title={title} description={text} />
      <PageHeader crumb={crumb} title={title} backgroundImage={backgroundImage} backgroundAlt={backgroundAlt} />
      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <p className="max-w-2xl text-[17px] leading-relaxed text-body">{text}</p>
        </div>
      </section>
    </>
  )
}
