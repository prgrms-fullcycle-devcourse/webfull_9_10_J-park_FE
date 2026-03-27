import {
  RunningTimerResponse,
  StartTimerRequest,
  StartTimerResponse,
  EndTimerRequest,
  EndTimerResponse,
} from '@/types/timer';

const BASE_URL = 'https://lampfire-backend.onrender.com';

export const fetchRunningTimer = async (
  goalId: number,
): Promise<RunningTimerResponse> => {
  const response = await fetch(`${BASE_URL}/timers?goalId=${goalId}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    if (response.status === 404)
      throw new Error('실행 중인 타이머가 없습니다.');
    throw new Error('타이머 정보를 불러오는데 실패했습니다.');
  }

  return response.json();
};

export const startTimer = async (
  data: StartTimerRequest,
): Promise<StartTimerResponse> => {
  const response = await fetch(`${BASE_URL}/timers/start`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 409)
      throw new Error('이미 실행 중인 타이머가 있습니다.');
    throw new Error('타이머 시작에 실패했습니다.');
  }

  return response.json();
};

export const endTimer = async (
  data: EndTimerRequest,
): Promise<EndTimerResponse> => {
  const response = await fetch(`${BASE_URL}/timers/end`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('타이머 종료에 실패했습니다.');
  }

  return response.json();
};
