import { ApiResponse } from '@/types';

export interface GoalDetailResponse extends ApiResponse {
  data: GoalDetail;
}

export type GoalDetail = {
  id: number; // 목표 id
  title: string; // 목표 이름
  description: string; // 목표 설명
  category: string; // 목표 카테고리
  progress: Progress; // 진행도 관련 정보
  period: Period;
  dailyProgress: DailyProgress[];
};

export type Progress = {
  rate: number; // 진행률
  currentAmount: number; // 현재 진행도
  targetAmount: number; // 목표
  totalStudyTime: number; // 해당 목표의 총 공부 시간
  unit: string; // 단위
};

export type Period = {
  startDate: string;
  endDate: string;
  daysRemaining: number;
};

export type DailyProgress = {
  goalLogId: number;
  date: string;
  targetAmount: number; // 해당 일자의 목표 할당량
  completedAmount: number; // 실제 완료한 분량
  isCompleted: boolean;
  studyTime: number; // 해당 일자의 해당 목표 공부 시간
  isToday: boolean;
};
