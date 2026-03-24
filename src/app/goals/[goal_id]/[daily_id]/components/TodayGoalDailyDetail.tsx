'use client';

import { Progress } from '@heroui/react';

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
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-white">오늘의 목표 달성률</h3>
        <span className="text-2xl font-extrabold text-white">{ratio}%</span>
      </div>

      <Progress
        value={ratio}
        color="success"
        className="w-full"
        classNames={{
          indicator: 'bg-[#52c41a]',
          track: 'bg-[#d9d9d9]',
        }}
        size="lg"
        radius="none"
      />

      <div className="flex justify-end gap-6 text-base font-bold text-white mt-1">
        <span>
          {completedGoals}/{totalGoals}개
        </span>
      </div>
    </div>
  );
}
