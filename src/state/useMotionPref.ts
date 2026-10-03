import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MotionPrefState {
  reduced: boolean;
  initialized: boolean;
  setReduced: (value: boolean) => void;
  init: () => void;
}

export const useMotionPref = create<MotionPrefState>()(
  persist(
    (set) => ({
      reduced: false,
      initialized: false,

      setReduced: (value) => set({ reduced: value }),

      init: () => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        set({ reduced: mq.matches, initialized: true });
      },
    }),
    {
      name: 'cqpev-movimento',
      partialize: (state) => ({ reduced: state.reduced }),
    }
  )
);
