import { create } from 'zustand';

export const useHUDStore = create((set) => ({
    heading: 0,
    setHeading: (heading) => set({ heading }),
    pitch: 0,
    setPitch: (pitch) => set({ pitch }),
}));
