import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  playingId: number | null;
  startTime: number | null;
  recordedTimes: Record<number, number>;
  startTimer: (id: number) => void;
  stopTimer: () => void;
  clearRecordedTime: (id: number) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      playingId: null,
      startTime: null,
      recordedTimes: {},

      startTimer: (id) => set({ playingId: id, startTime: Date.now() }),

      stopTimer: () => set({ playingId: null, startTime: null }),

      clearRecordedTime: (id) =>
        set((state) => {
          const newRecordedTimes = { ...state.recordedTimes };
          delete newRecordedTimes[id];
          return { recordedTimes: newRecordedTimes };
        }),
    }),
    {
      name: 'timer-storage',
    },
  ),
);
