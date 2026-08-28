import { Link } from 'react-router-dom'

export default function InsightCard({ article }) {
  return (
    <article className="flex flex-col">
      <Link to={`/insights/${article.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img src={article.image} alt={article.title} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/55" />
        <h3 className="absolute inset-x-0 bottom-0 p-5 text-[19px] font-bold leading-snug text-white">
          {article.title}
        </h3>
      </Link>
      <p className="mt-4 text-[15px] leading-relaxed text-body line-clamp-2">{article.excerpt}</p>
      <Link to={`/insights/${article.slug}`} className="mt-3 inline-block text-[14px] font-semibold text-accent hover:underline">
        Read More →
      </Link>
    </article>
  )
}
