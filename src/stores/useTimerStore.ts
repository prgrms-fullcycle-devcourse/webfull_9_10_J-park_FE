import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  playingId: number | null;
  startTime: number | null;
  recordedTimes: Record<number, number>;
  startTimer: (id: number) => void;
  stopTimer: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      playingId: null,
      startTime: null,
      recordedTimes: {},

      startTimer: (newId) => {
        const { playingId, startTime, recordedTimes } = get();
        const newRecordedTimes = { ...recordedTimes };

        if (playingId !== null && playingId !== newId && startTime !== null) {
          const elapsed = Date.now() - startTime;
          newRecordedTimes[playingId] =
            (newRecordedTimes[playingId] || 0) + elapsed;
        }

        if (playingId !== newId) {
          set({
            playingId: newId,
            startTime: Date.now(),
            recordedTimes: newRecordedTimes,
          });
        }
      },

      stopTimer: () => {
        const { playingId, recordedTimes } = get();

        if (playingId !== null) {
          set({
            playingId: null,
            startTime: null,
            recordedTimes: {
              ...recordedTimes,
              [playingId]: 0,
            },
          });
        }
      },
    }),
    {
      name: 'goal-timer-storage',
    },
  ),
);
