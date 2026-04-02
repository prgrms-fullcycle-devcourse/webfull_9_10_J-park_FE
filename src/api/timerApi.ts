// src/api/timerApi.ts
import apiClient from '@/lib/axios';

interface StartTimerPayload {
  goalId: number;
}

interface EndTimerPayload {
  goalId: number;
  currentCompletedAmount: number;
  isPaused: boolean;
}

// 타이머 시작
export const startTimer = async (data: StartTimerPayload) => {
  const response = await apiClient.post('/timers/start', data);
  return response.data;
};

// 타이머 종료
export const endTimer = async (data: EndTimerPayload) => {
  const response = await apiClient.post('/timers/end', data);
  return response.data;
};
