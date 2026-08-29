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
  certifications: string[]; // activity-specific qualifications, e.g. "Advanced First Aid", "Working With Children Check"
  rating: number;
  verified: boolean;
};

export type JournalBadge = {
  id: string;
  emoji: string;
  title: string;
  city: string;
  note: string;
  date: string;
  accent: string;
  activityId?: string;
};

export type BadgeType = {
  emoji: string;
  label: string;
};

export type FireflyResource = {
  id: string;
  name: string;
  type: "water" | "power" | "firstaid" | "toilet" | "shelter" | "connectivity";
  status: "available" | "limited" | "unavailable";
  updatedAt: number;
  reports: number;
  confidence: number;
  distanceKm: number;
};
