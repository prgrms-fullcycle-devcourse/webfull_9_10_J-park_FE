import apiClient from '@/lib/axios';

// 오늘 목표 달성률
export const fetchTodayProgress = async () => {
  const response = await apiClient.get('/goals/today/complete');
  return response.data;
};

// 오늘 목표 리스트
export const fetchTodayGoals = async () => {
  const response = await apiClient.get('/goals/today');
  return response.data;
};
