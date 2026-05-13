import { Package } from './types';

export const FEATURED_PACKAGES: Package[] = [
  {
    id: 'char-dham',
    title: 'Char Dham Yatra',
    description: 'A sacred journey to the four hallowed sites nestled in the Himalayas - Yamunotri, Gangotri, Kedarnath, and Badrinath.',
    imageUrl: 'https://images.unsplash.com/photo-1627811910041-38ee0be78567?q=80&w=1200&auto=format',
    price: 45000,
    duration: '12 Days',
    region: 'North India',
    inclusions: ['Premium Stay', 'Sattvic Meals', 'Local Guide', 'VIP Darshan'],
    itinerary: [
      { day: 1, activity: 'Arrival in Haridwar and evening Ganga Aarti' },
      { day: 2, activity: 'Depart for Barkot via Mussoorie' },
      { day: 3, activity: 'Trek to Yamunotri Temple' }
    ]
  },
  {
    id: 'varanasi-divine',
    title: 'Varanasi Spiritual Aura',
    description: 'Experience the eternal city of lights. Witness the magical Ganga Aarti and explore ancient temples along the river.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format',
    price: 18000,
    duration: '4 Days',
    region: 'North India',
    inclusions: ['Ghatside Hotel', 'Boat Tours', 'Priest for Rituals'],
    itinerary: [
      { day: 1, activity: 'Sunset Boat ride and Dashashwamedh Ghat Aarti' },
      { day: 2, activity: 'Early morning Surya Namaskar and Kashi Vishwanath Darshan' }
    ]
  },
  {
    id: 'rameswaram-special',
    title: 'Rameshwaram & Madurai',
    description: 'A divine circuit of the South. Bathe in the 22 holy wells of Ramanathaswamy and witness the grandeur of Meenakshi Amman.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format',
    price: 28000,
    duration: '6 Days',
    region: 'South India',
    inclusions: ['Luxury Transport', 'Guided Tours', 'Spiritual Sessions'],
    itinerary: [
      { day: 1, activity: 'Arrival in Madurai and Meenakshi Amman Darshan' },
      { day: 2, activity: 'Travel to Rameshwaram via Pamban Bridge' }
    ]
  }
];

export const REGIONS = ['All Paths', 'North India', 'South India', 'West India', 'East India', 'Jyotirlinga Special'];
