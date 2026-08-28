import { Link } from 'react-router-dom'

const descriptions = {
  'banking-financial-institutions': 'Bank note, bullion, and negotiable instrument movement between institutions.',
  'diamonds-jewelry': 'Insured transport and vaulting for polished stones, loose diamonds, and finished pieces.',
  'precious-metals': 'Bullion and refined metal custody with verified weight and assay documentation.',
  'legal-document-custody': 'Confidential handling of wills, contracts, and case-critical evidence.',
  'fine-art-collectibles': 'Climate-controlled transport and storage for irreplaceable pieces.',
  'private-clients': 'Discreet, white-glove custody for individuals and families.',
}

export default function IndustryTile({ industry }) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden"
    >
      <img src={industry.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-navy/60 transition-colors duration-300 group-hover:bg-navy/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-[20px] font-bold text-white">{industry.name}</h3>
        <p className="mt-3 max-w-[240px] text-[14px] leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {descriptions[industry.slug]}
        </p>
      </div>
    </Link>
  )
}
