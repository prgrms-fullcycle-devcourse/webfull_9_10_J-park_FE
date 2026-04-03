export interface TodayGoal {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  unit: string;
  studyTime: number;
  completed: boolean;
  isTimerRunning: boolean;
  progressRate: number;
  goalLogId: number;
}

export interface TodayGoalResponse {
  success: boolean;
  message: string;
  data: {
    totalStudyTime: number;
    todayGoals: TodayGoal[];
  };
}
