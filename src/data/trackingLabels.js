export const STATUS_LABELS = {
  collection_scheduled: 'Collection Scheduled',
  collected_verified: 'Collected & Verified',
  in_transit: 'In Transit',
  in_custody: 'In Custody',
  released: 'Released',
}

export const ASSET_TYPE_LABELS = {
  cash: 'Cash',
  bullion: 'Bullion',
  jewelry: 'Jewelry',
  documents: 'Documents',
  fine_art: 'Fine Art',
  vehicle: 'Vehicle',
  other: 'Other',
}

export function formatLocation(city, country) {
  return [city, country].filter(Boolean).join(', ')
}
