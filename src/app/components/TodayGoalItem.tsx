'use client';

import { Link } from '@heroui/react';
import GoalPlayButton from '@/components/GoalPlayButton';
import GoalStatusBadge from '@/components/GoalStatusBadge';
import { formatMilliseconds } from '@/lib/utils';
import { useTimerStore } from '@/stores/useTimerStore';
import { TodayGoal as GoalType } from '@/types/goal';
import { useSyncedTime } from '@/hooks/useSyncedTime';

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
  isPlaying,
  onPlayClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: TodayGoalItemProps) {
  const { startTime, recordedTimes } = useTimerStore();
  const currentGlobalTime = useSyncedTime();

  const baseTime = goal.studyTime + (recordedTimes[goal.id] || 0);

  const liveTime =
    isPlaying && startTime
      ? baseTime + (currentGlobalTime - startTime)
      : baseTime;

  return (
    <Link
      href={`/goals/${goal.id}/${goal.dailyId}`}
      className="flex w-full bg-white border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing text-foreground"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex w-full pointer-events-none">
        <div className="flex flex-1 items-center justify-between p-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-gray-800">
                {goal.title}
              </span>

              <span className="text-base font-bold text-gray-800">
                {formatMilliseconds(liveTime)}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {goal.currentAmount} / {goal.targetAmount}
              {goal.unit}
            </span>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            <GoalStatusBadge status={goal.completed ? '달성' : '미달성'} />
            <GoalPlayButton
              isPlaying={isPlaying}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPlayClick(e, goal.id, goal.dailyId);
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
