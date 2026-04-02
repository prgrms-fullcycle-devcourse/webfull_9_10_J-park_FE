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

// 개별 목표 상세 조회 API
export const fetchGoalDetail = async (goalId: number) => {
  const response = await apiClient.get(`/goals/${goalId}/detail`);
  return response.data;
};
