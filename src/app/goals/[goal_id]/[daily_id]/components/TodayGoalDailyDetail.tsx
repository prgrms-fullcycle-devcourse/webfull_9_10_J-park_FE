'use client';

import { Progress } from '@heroui/react';
import { useEffect, useState } from 'react';

interface TodayGoalDailyDetailProps {
  currentAmount: number;
  targetAmount: number;
}

export default function TodayGoalDailyDetail({
  currentAmount,
  targetAmount,
}: TodayGoalDailyDetailProps) {
  const targetRatio =
    targetAmount > 0 ? Math.floor((currentAmount / targetAmount) * 100) : 0;

  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(targetRatio);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [targetRatio]);

  return (
    <div className="flex flex-col gap-2 mt-2 pb-8">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-white">현재 목표 달성률</h3>
        <span className="text-2xl font-extrabold text-white">{value}%</span>
      </div>

      <Progress
        value={value}
        color="success"
        aria-label="현재 목표 진행률"
        className="w-full"
        classNames={{
          track: 'bg-[#d9d9d9]',
        }}
        size="lg"
      />
    </div>
  );
}
