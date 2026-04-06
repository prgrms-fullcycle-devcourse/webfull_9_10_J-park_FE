'use client';

import { Button, Link } from '@heroui/react';
import { FcSurvey } from 'react-icons/fc';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { TodayGoal as GoalType } from '@/types/goal';

interface TodayGoalItemProps {
  goal: GoalType;
}

export default function TodayGoalItem({ goal }: TodayGoalItemProps) {
  return (
    <Button
      as={Link}
      variant="light"
      href={`/goals/${goal.id}/${goal.goalLogId}`}
      fullWidth
      className="h-full px-6 py-4"
      draggable
      radius="none"
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex w-full pointer-events-none">
        <div className="flex w-full gap-2">
          <Button
            radius="full"
            className="p-0 hover:cursor-default bg-primary"
            isIconOnly
            disableAnimation
            disableRipple
          >
            <FcSurvey size={24} />
          </Button>
          <div className="flex flex-col w-2/3">
            <p className="truncate font-black text-xl">{goal.title}</p>
            <small className="text-gray-600 ">
              {goal.currentAmount.toLocaleString()} /{' '}
              {goal.targetAmount.toLocaleString()}
              {goal.unit}
            </small>
          </div>

          <Button
            radius="full"
            className="ml-auto p-0"
            isIconOnly
            disableAnimation
            disableRipple
            variant="light"
          >
            <IoChevronForwardOutline size={20} />
          </Button>
        </div>
      </div>
    </Button>
  );
}
