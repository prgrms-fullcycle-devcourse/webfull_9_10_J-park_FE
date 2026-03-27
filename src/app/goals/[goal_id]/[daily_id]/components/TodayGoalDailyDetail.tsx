'use client';

import { Progress } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodayProgress } from '@/api/goalApi';

export default function TodayGoalDailyDetail() {
  const { data: progressData } = useQuery({
    queryKey: ['todayProgress'],
    queryFn: fetchTodayProgress,
  });

  const safeData = progressData?.data || {
    ratio: 0,
    completedGoals: 0,
    totalGoals: 0,
  };

  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(safeData.ratio);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [safeData.ratio]);

  return (
    <div className="flex flex-col gap-2 mt-2 pb-8">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-white">오늘의 목표 달성률</h3>
        <span className="text-2xl font-extrabold text-white">{value}%</span>
      </div>

      <Progress
        value={value}
        color="success"
        aria-label="오늘의 목표 전체 진행률"
        className="w-full"
        classNames={{
          track: 'bg-[#d9d9d9]',
        }}
        size="lg"
      />

      <div className="relative mt-2">
        <span
          className="absolute transition-all duration-500 ease-in-out text-white"
          style={{ left: `${Math.max(0, value - 3)}%` }}
        >
          <p className="font-bold -mb-1 text-center">
            {safeData.completedGoals} 개
          </p>
        </span>

        <span className="absolute right-0 text-white text-right">
          <p className="font-bold -mb-1">{safeData.totalGoals} 개</p>
        </span>
      </div>
    </div>
  );
}
