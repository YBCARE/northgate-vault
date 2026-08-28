import { useEffect } from 'react'

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Northgate Vault` : 'Northgate Vault | Secure Custody & Transport'
    document.title = fullTitle

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description) meta.setAttribute('content', description)
  }, [title, description])

  return null
}
