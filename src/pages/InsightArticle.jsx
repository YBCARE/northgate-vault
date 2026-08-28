import { useParams, Navigate, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { insights } from '../data/insights.js'

function ArticleBlock({ block }) {
  if (block.type === 'h2') {
    return <h2 className="mt-10 text-[24px] font-bold leading-tight text-navy first:mt-0">{block.text}</h2>
  }
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 flex flex-col gap-2">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[17px] leading-relaxed text-body">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return <p className="mt-4 text-[17px] leading-relaxed text-body">{block.text}</p>
}

export default function InsightArticle() {
  const { slug } = useParams()
  const article = insights.find((a) => a.slug === slug)

  if (!article) return <Navigate to="/insights" replace />

  const related = insights.filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <>
      <Seo title={article.title} description={article.excerpt} />
      <PageHeader
        crumbs={[{ label: 'Insights', to: '/insights' }, { label: article.title }]}
        title={article.title}
      />

      <img src={article.image} alt={article.title} loading="lazy" className="h-[320px] w-full object-cover sm:h-[420px]" />

      <section className="bg-white py-16 lg:py-20">
        <div className="shell">
          <div className="mx-auto max-w-[760px]">
            {article.body.map((block, i) => <ArticleBlock key={i} block={block} />)}
          </div>
        </div>
      </section>

      <section className="bg-section py-16 lg:py-20">
        <div className="shell">
          <h2 className="text-[28px] font-bold text-navy">Related Insights</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/insights/${item.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 text-[17px] font-semibold leading-snug text-navy group-hover:text-accent">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
