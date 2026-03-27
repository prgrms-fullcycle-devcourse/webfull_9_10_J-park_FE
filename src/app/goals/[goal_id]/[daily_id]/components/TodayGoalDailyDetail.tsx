'use client';

import { Progress } from '@heroui/react';
import { useEffect, useState } from 'react';

// 💡 Props 구조는 동일하게 유지합니다.
interface TodayGoalDailyDetailProps {
  ratio: number;
  completedGoals: number;
  totalGoals: number;
}

export default function TodayGoalDailyDetail({
  ratio,
  completedGoals,
  totalGoals,
}: TodayGoalDailyDetailProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(ratio);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [ratio]);

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
          <p className="font-bold -mb-1 text-center">{completedGoals} 개</p>
        </span>

        <span className="absolute right-0 text-white text-right">
          <p className="font-bold -mb-1">{totalGoals} 개</p>
        </span>
      </div>
    </div>
  );
}
