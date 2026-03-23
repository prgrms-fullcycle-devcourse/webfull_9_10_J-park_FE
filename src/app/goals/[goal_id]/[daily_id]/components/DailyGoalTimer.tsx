'use client';

import { useEffect, useState } from 'react';
import { useTimerStore } from '@/stores/useTimerStore';
import { formatMilliseconds } from '@/lib/utils';
import GoalPlayButton from '@/components/GoalPlayButton';

interface DailyGoalTimerProps {
  goalId: number;
  goalTitle: string;
  quotaText: string;
}

export default function DailyGoalTimer({
  goalId,
  goalTitle,
  quotaText,
}: DailyGoalTimerProps) {
  const { playingId, startTime, stopTimer, startTimer } = useTimerStore();
  const [elapsedMs, setElapsedMs] = useState(0);

  const isPlaying = playingId === goalId;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && startTime) {
      interval = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 1000);
    } else {
      setElapsedMs(0);
    }

    return () => clearInterval(interval);
  }, [isPlaying, startTime]);

  const handleToggleTimer = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (isPlaying) {
        console.log(
          `[API] 백엔드로 전송 -> 목표 ${goalId} 정지! 누적: ${elapsedMs}ms`,
        );
        stopTimer();
      } else {
        console.log(`[API] 백엔드로 전송 -> 목표 ${goalId} 시작!`);
        startTimer(goalId);
      }
    } catch (error) {
      console.error('API 통신 에러:', error);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold text-white">{goalTitle}</span>
        <span className="text-xl font-bold text-white">{quotaText}</span>
      </div>

      <div className="text-3xl font-bold text-white tracking-wider">
        {formatMilliseconds(elapsedMs)}
      </div>

      <div className="ml-4 scale-125 origin-right">
        <GoalPlayButton isPlaying={isPlaying} onClick={handleToggleTimer} />
      </div>
    </div>
  );
}
