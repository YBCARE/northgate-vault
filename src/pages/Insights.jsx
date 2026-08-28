import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import InsightCard from '../components/InsightCard.jsx'
import DualCtaBlock from '../components/DualCtaBlock.jsx'
import { insights } from '../data/insights.js'

export default function Insights() {
  return (
    <>
      <Seo
        title="Insights"
        description="Analysis and guidance on secure custody, cross-border logistics, and asset protection from Northgate Vault."
      />
      <PageHeader
        crumb="Insights"
        title="Insights"
        subtitle="Analysis and guidance on secure custody, cross-border logistics, and asset protection."
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((article) => <InsightCard key={article.slug} article={article} />)}
          </div>
        </div>
      </section>

      <DualCtaBlock />
    </>
  )
}
