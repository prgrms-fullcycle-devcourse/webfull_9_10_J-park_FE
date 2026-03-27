import { TodayGoalResponse } from '@/types/goal';

export const fetchTodayGoals = async (): Promise<TodayGoalResponse> => {
  const response = await fetch(
    'https://lampfire-backend.onrender.com/goals/today',
    {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response.ok) {
    if (response.status === 401) throw new Error('유효하지 않은 토큰입니다.');
    if (response.status === 500) throw new Error('서버 오류가 발생했습니다.');
    throw new Error('오늘의 목표 데이터를 불러오는데 실패했습니다.');
  }

  return response.json();
};

export const fetchTodayProgress = async () => {
  const response = await fetch(
    'https://lampfire-backend.onrender.com/goals/today/complete',
    {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (!response.ok)
    throw new Error('오늘 목표 달성률을 불러오는데 실패했습니다.');
  return response.json();
};
