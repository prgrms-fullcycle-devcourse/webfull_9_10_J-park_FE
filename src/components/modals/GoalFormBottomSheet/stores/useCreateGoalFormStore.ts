import { CalendarDate } from '@heroui/react';
import { create } from 'zustand';

interface GoalFormState {
  name: string;
  description?: string;
  category: string;
  totalAmount: string;
  startDate: CalendarDate | null;
  dueDate: CalendarDate | null;
  setName: (payload: string) => void;
  setDescription: (payload: string) => void;
  setTotalAmount: (payload: string) => void;
  setCategory: (payload: string) => void;
  setStartDate: (payload: CalendarDate | null) => void;
  setDueDate: (payload: CalendarDate | null) => void;
}

export const useCreateGoalFormStore = create<GoalFormState>()((set) => ({
  name: '',
  description: undefined,
  category: 'book',
  totalAmount: '0',
  startDate: null,
  dueDate: null,
  setName: (payload: string) => set(() => ({ name: payload })),
  setDescription: (payload: string) => set(() => ({ description: payload })),
  setTotalAmount: (payload: string) => set(() => ({ totalAmount: payload })),
  setCategory: (payload: string) => set(() => ({ category: payload })),
  setStartDate: (payload: CalendarDate | null) =>
    set(() => ({ startDate: payload })),
  setDueDate: (payload: CalendarDate | null) =>
    set(() => ({ dueDate: payload })),
}));
