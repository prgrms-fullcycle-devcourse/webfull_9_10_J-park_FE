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
    </div>
  );
}
