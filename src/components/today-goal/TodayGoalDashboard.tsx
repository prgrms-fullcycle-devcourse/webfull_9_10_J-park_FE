'use client';

import { useNavigate } from 'react-router';
import { Switch } from '@heroui/react';
import GoalStatusBadge from './components/GoalStatusBadge';
import GoalPlayButton from './components/GoalPlayButton';
import { useTodayGoals } from '@/hooks/queries/use-today-goals';
import { formatMilliseconds } from '@/lib/utils';
import { TodayGoal } from '@/types/goal';

const GOAL_COLORS = [
  'bg-red-500',
  'bg-orange-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
];

export default function TodayGoalDashboard() {
  const navigate = useNavigate();

  const { data } = useTodayGoals();
  const goals = data?.todayGoals;

  const handleGoalClick = (id: number) => {
    navigate(`/daily-detail/${id}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-2">오늘의 목표</h2>

      {goals?.map((goal: TodayGoal, index: number) => {
        const statusText = goal.completed ? '달성' : '미달성';
        const colorClass = GOAL_COLORS[index % GOAL_COLORS.length];

        return (
          <div
            key={goal.id}
            onClick={() => handleGoalClick(goal.id)}
            className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className={`w-4 h-20 ${colorClass}`} />

            <div className="flex flex-1 items-center justify-between p-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-black">{goal.title}</span>
                  <span className="font-bold text-black">
                    {formatMilliseconds(goal.studyTime)}
                  </span>
                </div>
                <span className="text-sm text-gray-500 mt-1">
                  오늘 할당량 ({goal.currentAmount}/{goal.targetAmount}
                  {goal.unit})
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Switch size="sm" color="success" isSelected={goal.completed} />
                <GoalStatusBadge status={statusText} />
                <GoalPlayButton />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
