'use client';

import { TodayGoal } from '@/types/goal';

interface DailyGoalListProps {
  goals: TodayGoal[];
}

const GOAL_COLORS = ['bg-red-500', 'bg-orange-400', 'bg-green-500'];

export default function DailyGoalList({ goals }: DailyGoalListProps) {
  return (
    <div className="flex flex-col mt-4">
      <h3 className="text-base font-bold text-white mb-3">오늘의 목표</h3>

      <div className="flex flex-col bg-white overflow-hidden rounded-md">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="flex w-full bg-white border-b last:border-b-0 border-gray-200"
          >
            <div className={`w-3 ${GOAL_COLORS[index % GOAL_COLORS.length]}`} />

            <div className="flex flex-col items-start gap-1 p-4">
              <span className="text-base font-bold text-black">
                {goal.title}
              </span>
              <span className="text-sm text-gray-600">
                {goal.currentAmount} / {goal.targetAmount} {goal.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
