const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M16 3 27 7.5v9C27 23.5 22 27.5 16 29 10 27.5 5 23.5 5 16.5v-9L16 3Z" {...base} />
      <path d="M11 16.5l3.3 3.3L21 13" {...base} />
    </svg>
  )
}

export function TransportIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <rect x="4" y="14" width="22" height="14" />
      <path d="M26 19h6l4 5v4h-4" />
      <circle cx="12" cy="30" r="2.6" />
      <circle cx="30" cy="30" r="2.6" />
      <path d="M4 20h14" />
    </svg>
  )
}

export function VaultIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <rect x="5" y="5" width="30" height="30" rx="1" />
      <circle cx="20" cy="20" r="7" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 13v2M20 25v2M13 20h2M25 20h2" />
    </svg>
  )
}

export function DocumentIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <path d="M11 4h13l6 6v26H11Z" />
      <path d="M24 4v6h6" />
      <path d="M15 20h10M15 25h10M15 30h6" />
    </svg>
  )
}

export function PrivateIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <circle cx="20" cy="13" r="6" />
      <path d="M8 34c1.5-8 6-11 12-11s10.5 3 12 11" />
    </svg>
  )
}

export function TrackingIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <circle cx="20" cy="20" r="15" />
      <path d="M20 11v9l6 4" />
    </svg>
  )
}

export function CustodyBadgeIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <path d="M20 5 33 10v9c0 8-5.5 13.5-13 16-7.5-2.5-13-8-13-16v-9L20 5Z" />
      <path d="M14 20l4 4 8-9" />
    </svg>
  )
}

export function LiabilityIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <path d="M20 5 33 10v9c0 8-5.5 13.5-13 16-7.5-2.5-13-8-13-16v-9L20 5Z" />
      <path d="M20 13v10M20 27v.01" />
    </svg>
  )
}

export function DiscretionIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <path d="M6 12c4-4 24-4 28 0-1 12-6 18-14 22-8-4-13-10-14-22Z" />
      <path d="M14 20h12" />
    </svg>
  )
}

export function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 40 40" {...base} aria-hidden="true" {...props}>
      <circle cx="20" cy="20" r="15" />
      <path d="M5 20h30M20 5c4 4 6 9.5 6 15s-2 11-6 15c-4-4-6-9.5-6-15s2-11 6-15Z" />
    </svg>
  )
}

export function WarningIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2 23 21H1L12 2Z" opacity="0.15" />
      <path d="M12 2 23 21H1L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function ChevronDown(props) {
  return (
    <svg viewBox="0 0 16 16" {...base} aria-hidden="true" {...props}>
      <path d="m4 6 4 4 4-4" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export const integrityIcon = ShieldIcon
export const precisionIcon = TrackingIcon

export function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
    </svg>
  )
}

export function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function EyeOffIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A9.5 9.5 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.5 4.4M6.2 6.6C3.6 8.3 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 3.4-.6" />
      <path d="M9.9 10a3 3 0 0 0 4.1 4.1" />
    </svg>
  )
}

export function SearchLargeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
