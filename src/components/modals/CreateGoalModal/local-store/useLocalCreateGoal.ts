import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { create } from 'zustand';

type CreateGoalState = {
  step: number;
  title: string;
  detail: string;
  totalAmount: number;
  category: number;
  startDate: CalendarDate;
  endDate: CalendarDate;
};
type CreateGoalAction = {
  next: () => void;
  prev: () => void;
  reset: () => void;
  setTitle: (nextTitle: CreateGoalState['title']) => void;
  setDetail: (nextDetail: CreateGoalState['detail']) => void;
  setTotalAmount: (nextTotalAmount: CreateGoalState['totalAmount']) => void;
  setCategory: (nextCategory: CreateGoalState['category']) => void;
  setStartDate: (nextStartDate: CreateGoalState['startDate']) => void;
  setEndDate: (nextEndDate: CreateGoalState['endDate']) => void;
};

type CreateGoalLocalStore = CreateGoalState & CreateGoalAction;
const MAX_STEP = 3;
const initialState = {
  step: 0,
  title: '',
  detail: '',
  totalAmount: 0,
  category: 1,
  startDate: today(getLocalTimeZone()),
  endDate: today(getLocalTimeZone()).add({ weeks: 1 }),
};
export const useLocalCreateGoal = create<CreateGoalLocalStore>((set) => ({
  ...initialState,
  reset: () => {
    set(() => ({ ...initialState }));
  },
  next: () => {
    set((state) => ({ step: Math.min(state.step + 1, MAX_STEP) }));
  },
  prev: () => {
    set((state) => ({ step: Math.max(0, state.step - 1) }));
  },
  setTitle: (nextTitle) => {
    set(() => ({ title: nextTitle }));
  },
  setDetail: (nextDetail) => {
    set(() => ({ detail: nextDetail }));
  },
  setTotalAmount: (nextTotalAmount) => {
    set(() => ({ totalAmount: nextTotalAmount }));
  },
  setCategory: (nextCategory) => {
    set(() => ({ category: nextCategory }));
  },
  setStartDate: (nextStartDate) => {
    set(() => ({ startDate: nextStartDate }));
  },
  setEndDate: (nextEndDate) => {
    set(() => ({ endDate: nextEndDate }));
  },
}));
