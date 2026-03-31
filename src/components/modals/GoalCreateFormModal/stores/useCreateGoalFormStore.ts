import { CalendarDate } from '@heroui/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { create } from 'zustand';

interface GoalFormState {
  title: string;
  detail?: string;
  category: string;
  totalAmount: number;
  startDate: CalendarDate;
  endDate: CalendarDate;
  quota: string;
  setTitle: (payload: string) => void;
  setDetail: (payload: string) => void;
  setTotalAmount: (payload: number) => void;
  setCategory: (payload: string) => void;
  setStartDate: (payload: CalendarDate) => void;
  setEndDate: (payload: CalendarDate) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  detail: undefined,
  category: '',
  totalAmount: 0,
  startDate: today(getLocalTimeZone()),
  endDate: today(getLocalTimeZone()).add({ weeks: 1 }),
  quota: '0',
};

export const useCreateGoalFormStore = create<GoalFormState>()((set) => ({
  ...initialState,
  setTitle: (payload: string) => set(() => ({ title: payload })),
  setDetail: (payload: string) => set(() => ({ detail: payload })),
  setTotalAmount: (payload: number) =>
    set(() => ({ totalAmount: Math.max(0, payload) })),
  setCategory: (payload: string) => set(() => ({ category: payload })),
  setStartDate: (payload: CalendarDate) => set(() => ({ startDate: payload })),
  setEndDate: (payload: CalendarDate) => set(() => ({ endDate: payload })),
  setQuota: (payload: string) => set(() => ({ quota: payload })),
  reset: () =>
    set(() => ({
      ...initialState,
    })),
}));
