'use client';

import { useEffect, useState } from 'react';
import { Link } from '@heroui/react';
import GoalPlayButton from '@/components/GoalPlayButton';
import GoalStatusBadge from '@/components/GoalStatusBadge';
import { formatMilliseconds } from '@/lib/utils';
import { useTimerStore } from '@/stores/useTimerStore';

interface TodayGoalItemProps {
  goal: any;
  colorClass: string;
  isPlaying: boolean;
  onPlayClick: (e: React.MouseEvent, goalId: number) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export default function TodayGoalItem({
  goal,
  colorClass,
  isPlaying,
  onPlayClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: TodayGoalItemProps) {
  const { startTime, recordedTimes } = useTimerStore();

  const baseTime = goal.studyTime + (recordedTimes[goal.id] || 0);

  const [liveTime, setLiveTime] = useState(baseTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && startTime) {
      interval = setInterval(() => {
        setLiveTime(baseTime + (Date.now() - startTime));
      }, 1000);
    } else {
      setLiveTime(baseTime);
    }
    return () => clearInterval(interval);
  }, [isPlaying, startTime, baseTime]);

  return (
    <Link
      href={`/goals/${goal.id}`}
      className="flex w-full bg-white border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing text-foreground"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex w-full pointer-events-none">
        <div className={`w-3 ${colorClass}`} />

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
              onClick={(e) => onPlayClick(e, goal.id)}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
