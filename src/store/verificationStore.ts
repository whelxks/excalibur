import { create } from 'zustand';

type VerificationState = {
  isVerified: boolean;
  setVerified: (v: boolean) => void;
};

// Seed `isVerified` from your actual user/profile API response on app load
// (e.g. in your root layout's effect), rather than defaulting to false forever.
export const useVerificationStore = create<VerificationState>((set) => ({
  isVerified: false,
  setVerified: (v) => set({ isVerified: v }),
}));