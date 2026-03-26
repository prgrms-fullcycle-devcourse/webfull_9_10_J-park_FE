import { CalendarDate } from '@heroui/react';
import { create } from 'zustand';

interface GoalFormState {
  title: string;
  detail?: string;
  category: string;
  totalAmount: string;
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  quota: string;
  setTitle: (payload: string) => void;
  setDetail: (payload: string) => void;
  setTotalAmount: (payload: string) => void;
  setCategory: (payload: string) => void;
  setStartDate: (payload: CalendarDate | null) => void;
  setEndDate: (payload: CalendarDate | null) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  detail: undefined,
  category: 'book',
  totalAmount: '0',
  startDate: null,
  endDate: null,
  quota: '0',
};

export const useCreateGoalFormStore = create<GoalFormState>()((set) => ({
  ...initialState,
  setTitle: (payload: string) => set(() => ({ title: payload })),
  setDetail: (payload: string) => set(() => ({ detail: payload })),
  setTotalAmount: (payload: string) => set(() => ({ totalAmount: payload })),
  setCategory: (payload: string) => set(() => ({ category: payload })),
  setStartDate: (payload: CalendarDate | null) =>
    set(() => ({ startDate: payload })),
  setEndDate: (payload: CalendarDate | null) =>
    set(() => ({ endDate: payload })),
  setQuota: (payload: string) => set(() => ({ quota: payload })),
  reset: () =>
    set(() => ({
      ...initialState,
    })),
}));
