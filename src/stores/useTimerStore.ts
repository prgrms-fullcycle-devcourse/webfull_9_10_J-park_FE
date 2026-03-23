import { create } from 'zustand';

interface TimerState {
  playingId: number | null;
  startTime: number | null;
  startTimer: (id: number) => void;
  stopTimer: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  playingId: null,
  startTime: null,

  startTimer: (id) => set({ playingId: id, startTime: Date.now() }),

  stopTimer: () => set({ playingId: null, startTime: null }),
}));
