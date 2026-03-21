import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { TodayGoalResponse } from '@/types/goal';

export const useTodayGoals = () => {
  return useQuery({
    queryKey: ['todayGoals'],
    queryFn: async () => {
      const response = await api.get<TodayGoalResponse>(
        '/goals/today/complete',
      );
      return response.data;
    },
  });
};
