'use client';

import { Link } from '@heroui/react';
import { TodayGoal } from '@/types/goal';

interface DailyGoalListProps {
  goals: TodayGoal[];
}

export default function DailyGoalList({ goals }: DailyGoalListProps) {
  return (
    <div className="flex flex-col mt-4">
      <h3 className="text-base font-bold text-white mb-3">오늘의 목표</h3>

      <div className="flex flex-col bg-white overflow-hidden rounded-md">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex w-full bg-white border-b last:border-b-0 border-gray-200 items-center justify-between p-4"
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-base font-bold text-black">
                {goal.title}
              </span>
              <span className="text-sm text-gray-600">
                {goal.currentAmount} / {goal.targetAmount} {goal.unit}
              </span>
            </div>

            <Link
              href={`/goals/${goal.id}`}
              className="px-4 py-2 text-sm font-bold text-orange-500 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              상세보기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
