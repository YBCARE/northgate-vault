export const MOVEMENT_TYPES = ['one_way', 'custody']

export const STATUSES = ['collection_scheduled', 'collected_verified', 'in_transit', 'in_custody', 'released']

export const ASSET_TYPES = ['cash', 'bullion', 'jewelry', 'documents', 'fine_art', 'vehicle', 'other']

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

// One sentence per status, in the site's voice. {ref} and {location} are replaced at send time.
export const STATUS_HEADLINES = {
  collection_scheduled: 'Collection of your consignment {ref} has been scheduled.',
  collected_verified: 'Your consignment {ref} has been collected and verified into custody.',
  in_transit: 'Your consignment {ref} is currently in transit.',
  in_custody: 'Your consignment {ref} is now in custody{locationSuffix}.',
  released: 'Your consignment {ref} has been released to the authorized recipient.',
}

export function formatLocation(city, country) {
  return [city, country].filter(Boolean).join(', ')
}

export function statusHeadline(status, ref, city, country) {
  const location = formatLocation(city, country)
  const locationSuffix = location ? ` at our ${location} facility` : ''
  const template = STATUS_HEADLINES[status] || 'There is an update on your consignment {ref}.'
  return template.replace('{ref}', ref).replace('{locationSuffix}', locationSuffix)
}
