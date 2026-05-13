export interface Package {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  duration: string;
  region: 'North India' | 'South India' | 'West India' | 'East India' | 'Jyotirlinga Special';
  inclusions: string[];
  itinerary: { day: number; activity: string }[];
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  date: string;
  numPilgrims: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  travelerDetails: {
    name: string;
    age: number;
    gender: string;
  }[];
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber?: string;
  isAdmin?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
