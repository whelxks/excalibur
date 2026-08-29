export type Activity = {
  id: string;
  title: string;
  city: string;
  country: string;
  neighbourhood: string;
  image: string;
  category: string;
  duration: string;
  price: number;
  maxPax: number;
  joined: number;
  blurb: string;
  story: string;
  hosts: Host[];
};

export type Host = {
  id: string;
  name: string;
  age: number;
  image: string;
  tagline: string;
  bio: string;
  languages: string[];
  badges: string[];
  rating: number;
  verified: boolean;
};

export type FireflyResource = {
  id: string;
  name: string;
  type: 'water' | 'power' | 'firstaid' | 'toilet' | 'shelter' | 'connectivity';
  status: 'available' | 'limited' | 'unavailable';
  updatedAt: number;
  reports: number;
  confidence: number;
  distanceKm: number;
};
