import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Northgate Vault home">
      <img
        src={light ? '/northgate-vault-icon-white.svg' : '/northgate-vault-icon-navy.svg'}
        alt=""
        className="h-8 w-8"
      />
      <span className={`text-[17px] font-bold tracking-[0.04em] ${light ? 'text-white' : 'text-navy'}`}>
        NORTHGATE VAULT
      </span>
    </Link>
  )
}
