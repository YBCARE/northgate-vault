import truckRearImage from '../assets/how-it-works-truck-rear.jpg'

export const stages = [
  {
    number: '01',
    title: 'Consultation & Risk Assessment',
    text: 'Every engagement starts with a conversation about the asset, its value, and where it needs to go. We assess route risk, regulatory requirements, and the level of security the specific engagement calls for, then propose a custody plan scoped to that assessment rather than a fixed package.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    docs: ['Engagement brief and scope of work', 'Risk assessment summary', 'Authorized-contact record'],
  },
  {
    number: '02',
    title: 'Collection & Verification',
    text: 'At collection, the asset is inspected, counted, and its condition recorded before it enters our custody. Two-person verification confirms what is being received against what was declared, and any discrepancy is flagged and resolved before the item moves.',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
    docs: ['Collection receipt with itemized condition record', 'Two-person verification signatures', 'Time-stamped custody transfer log'],
  },
  {
    number: '03',
    title: 'Secure Transport',
    text: 'Movement takes place under GPS-monitored routing with schedules and destinations disclosed only to the personnel directly responsible for the transfer. Routes are assessed for risk before departure and adjusted if conditions change en route.',
    image: truckRearImage,
    docs: ['Movement log with route and timing detail', 'In-transit monitoring records', 'Insurance certificate for the transit period'],
  },
  {
    number: '04',
    title: 'Custody & Storage',
    text: 'Assets held in storage sit behind layered physical security and access controls limited to a pre-approved list. Every inspection, audit, or partial release is logged against that list, so the custody record stays complete for the full duration of the engagement.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    docs: ['Custody certificate confirming receipt into storage', 'Access authorization list', 'Periodic condition and audit reports'],
  },
  {
    number: '05',
    title: 'Release & Delivery',
    text: 'Release requires identity verification against the authorized-contact record before an asset leaves our custody. Final delivery is confirmed and signed off by the receiving party, closing out the chain of custody with a complete, end-to-end record.',
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&q=80',
    docs: ['Release authorization and identity verification record', 'Delivery confirmation with receiving signature', 'Complete custody chain summary'],
  },
]
