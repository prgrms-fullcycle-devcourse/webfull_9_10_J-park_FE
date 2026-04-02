'use client';

import { Button, Link } from '@heroui/react';
import { FcSurvey } from 'react-icons/fc';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { TodayGoal as GoalType } from '@/types/goal';

interface TodayGoalItemProps {
  goal: GoalType;
  isPlaying: boolean;
  onPlayClick: (e: React.MouseEvent, goalId: number, dailyId: number) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export default function TodayGoalItem({
  goal,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: TodayGoalItemProps) {
  return (
    <Button
      as={Link}
      variant="light"
      href={`/goals/${goal.id}/${goal.dailyId}`}
      fullWidth
      className="h-full px-6 py-4"
      draggable
      radius="none"
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
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
              {goal.currentAmount} / {goal.targetAmount}
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
