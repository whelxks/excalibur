import { create } from 'zustand';
import { journalBadges as seedJournalBadges } from '@/lib/mockData';
import type { JournalBadge } from '@/lib/types';

type AppState = {
  country: string;
  city: string;
  selectedActivityId?: string;
  journalBadges: JournalBadge[];
  setDestination: (country:string, city:string)=>void;
  setSelectedActivity: (id:string)=>void;
};

export const useAppStore = create<AppState>((set)=>({
  country:'Japan',
  city:'Kyoto',
  journalBadges: seedJournalBadges,
  setDestination:(country,city)=>set({country,city}),
  setSelectedActivity:(selectedActivityId)=>set({selectedActivityId})
}));
