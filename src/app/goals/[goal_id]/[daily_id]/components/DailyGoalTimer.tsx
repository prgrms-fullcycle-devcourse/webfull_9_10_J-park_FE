'use client';

import { useEffect, useState } from 'react';
import { useTimerStore } from '@/stores/useTimerStore';
import { formatMilliseconds } from '@/lib/utils';

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

  const handleToggleTimer = async () => {
    try {
      if (isPlaying) {
        console.log(
          `[API] 백엔드로 전송 -> 목표 ${goalId} 타이머 정지! 누적: ${elapsedMs}ms`,
        );

        stopTimer();
      } else {
        console.log(`[API] 백엔드로 전송 -> 목표 ${goalId} 타이머 시작!`);

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

      <button
        onClick={handleToggleTimer}
        className={`flex items-center justify-center w-14 h-14 rounded-full transition-transform hover:scale-105 shadow-md ${
          isPlaying ? 'bg-[#f58d2c]' : 'bg-blue-500'
        }`}
      >
        {isPlaying ? (
          <div className="w-5 h-5 bg-[#dc2626] rounded-sm" />
        ) : (
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
        )}
      </button>
    </div>
  );
}
