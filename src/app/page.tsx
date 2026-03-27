'use client';

import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';
import NavigationBar from '@/components/navigationBar';
import TodayGoalDashboard from '@/app/components/TodayGoalDashboard';
import TodayGoalRatio from '@/app/components/TodayGoalRatio';
import PaceDial from './components/PaceDial';

import { fetchTodayGoals } from '@/api/goalApi';

export default function Home() {
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
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-bold">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const todayGoals = goalData?.data.todayGoals || [];

  return (
    <>
      <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
        <PaceDial />
        <TodayGoalRatio />
        <TodayGoalDashboard goals={todayGoals} />
      </div>

      <NavigationBar />
    </>
  );
}
