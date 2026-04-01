'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavigationBar from '@/components/navigationBar';
import DailyGoalTimer from './components/DailyGoalTimer';
import TodayGoalDailyDetail from './components/TodayGoalDailyDetail';
import DailyGoalList from './components/DailyGoalList';

import { fetchTodayGoals } from '@/api/goalApi';

export default function DailyGoalDetailPage({
  params,
}: {
  params: Promise<{ goal_id: string; daily_id: string }>;
}) {
  const resolvedParams = use(params);
  const currentGoalId = Number(resolvedParams.goal_id);

  const {
    data: goalData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todayGoals'],
    queryFn: fetchTodayGoals,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2a2a2a] text-white font-bold">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2a2a2a] text-red-500 font-bold">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const todayGoals = goalData?.data.todayGoals || [];
  const currentGoal =
    todayGoals.find(
      (g: { id: number; [key: string]: any }) => g.id === currentGoalId,
    ) || todayGoals[0];
  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-y-auto scrollbar-hide pb-20"
      style={{ backgroundColor: '#2a2a2a' }}
    >
      <div className="flex-1 p-5 flex flex-col gap-6">
        <DailyGoalTimer
          goalId={currentGoal?.id || 0}
          goalTitle={currentGoal?.title || '목표 없음'}
          quotaText="할당량"
          initialStudyTime={currentGoal?.studyTime || 0}
          targetAmount={currentGoal?.targetAmount || 0}
          unit={currentGoal?.unit || ''}
        />

        <hr className="border-gray-500" />

        <TodayGoalDailyDetail
          currentAmount={currentGoal?.currentAmount || 0}
          targetAmount={currentGoal?.targetAmount || 0}
        />
        {todayGoals.length > 0 ? (
          <DailyGoalList goals={todayGoals} />
        ) : (
          <div className="flex flex-col mt-4">
            <h3 className="text-base font-bold text-white mb-3">오늘의 목표</h3>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl border border-gray-600">
              <p className="text-white text-base font-bold">
                오늘의 목표가 없습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      <NavigationBar />
    </div>
  );
}
