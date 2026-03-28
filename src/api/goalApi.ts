import apiClient from '@/lib/axios';

export const fetchTodayProgress = async () => {
  const response = await apiClient.get('/goals/today/complete');
  return response.data;
};

export const fetchTodayGoals = async () => {
  const response = await apiClient.get('/goals/today');
  return response.data;
};
