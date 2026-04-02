import { ApiResponse } from './api';

/** 실행 중인 타이머 정보 조회 (GET /timers) */
export interface RunningTimerData {
  goalId: number;
  goalTitle: string;
  todayStudyDuration: number;
  todayProgressRate: number;
  todayCompletedAmount: number;
  todayTargetAmount: number;
  timer: {
    isRunning: boolean;
    startedAt: string;
  };
}

export interface RunningTimerResponse {
  success: boolean;
  message: string;
  data: RunningTimerData;
}

/** 타이머 시작 (POST /timers/start) */
export interface StartTimerRequest {
  goalId: number;
}

export interface StartTimerResponse {
  success: boolean;
  message: string;
  data: {
    goalId: number;
    timerRunning: boolean;
  };
}

/** 타이머 종료 (POST /timers/end) */
export interface EndTimerRequest {
  goalId: number;
  currentCompletedAmount: number;
  isPaused: boolean;
}

export interface EndTimerResponse {
  success: boolean;
  message: string;
  data: EndTimer;
}
export type EndTimer = {
  goalId: number;
  isTimerRunning: boolean;
  goalDuration: number;
  goalProgressRate: number;
};
