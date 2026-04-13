'use client';

import { Button, Link } from '@heroui/react';
import { TodayGoal } from '@/types/goal';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { FcSurvey } from 'react-icons/fc';

interface DailyGoalListProps {
  goals: TodayGoal[];
}

export default function DailyGoalList({ goals }: DailyGoalListProps) {
  return (
    <div className="animate-fadeIn flex flex-col">
      <small className="text-gray-600 p-6 pb-4">오늘 목표</small>
      <div className="flex flex-col">
        {goals.map((goal, index) => (
          <Button
            as={Link}
            href={`/goals/${goal.id}/${goal.goalLogId}`}
            radius="none"
            variant="light"
            key={goal.id ?? `daily-goal-${index}`}
            className="flex w-full h-full justify-between px-6 py-2"
          >
            <div className="flex gap-2">
              <Button
                radius="full"
                className="p-0 hover:cursor-default bg-primary"
                isIconOnly
                disableAnimation
                disableRipple
              >
                <FcSurvey size={24} />
              </Button>
              <span className="text-left">
                <p className="text-xl font-black -mb-1">{goal.title}</p>
                <small className="text-gray-600">
                  {goal.currentAmount}/{goal.targetAmount} {goal.unit}
                </small>
              </span>
            </div>
            <Button
              radius="full"
              className="p-0"
              isIconOnly
              disableAnimation
              disableRipple
              variant="light"
            >
              <IoChevronForwardOutline className="text-gray-600" size={20} />
            </Button>
          </Button>
        ))}
      </div>
    </div>
  );
}
