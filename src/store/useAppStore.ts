import { create } from 'zustand';

type AppState = {
  country: string;
  city: string;
  selectedActivityId?: string;
  setDestination: (country:string, city:string)=>void;
  setSelectedActivity: (id:string)=>void;
};

export const useAppStore = create<AppState>((set)=>({
  country:'Japan',
  city:'Kyoto',
  setDestination:(country,city)=>set({country,city}),
  setSelectedActivity:(selectedActivityId)=>set({selectedActivityId})
}));
