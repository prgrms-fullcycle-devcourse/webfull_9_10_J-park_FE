'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { formatMilliseconds } from '@/lib/utils';
import { useTimerStore } from '@/stores/useTimerStore';

import { fetchTodayProgress } from '@/api/goalApi';

export default function TodayGoalRatio() {
  const { playingId, startTime } = useTimerStore();

  const { data: progressData } = useQuery({
    queryKey: ['todayProgress'],
    queryFn: fetchTodayProgress,
  });

  const safeData = progressData?.data || {
    totalTime: 0,
    totalGoals: 0,
    completedGoals: 0,
    ratio: 0,
  };

  const baseTotalTime = safeData.totalTime;
  const [liveTotalTime, setLiveTotalTime] = useState(baseTotalTime);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (playingId !== null && startTime) {
      interval = setInterval(() => {
        setLiveTotalTime(baseTotalTime + (Date.now() - startTime));
      }, 1000);
    } else {
      setLiveTotalTime(baseTotalTime);
    }

    return () => clearInterval(interval);
  }, [playingId, startTime, baseTotalTime]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgressValue(safeData.ratio);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [safeData.ratio]);

  return (
    <div className="flex flex-col gap-8 p-5 bg-white w-full rounded-lg shadow-sm mb-4">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800">오늘 총 공부시간</h3>
        <div className="flex items-center justify-center w-full py-8 bg-gray-200 rounded-md">
          <span className="text-5xl font-extrabold text-black tracking-widest">
            {formatMilliseconds(liveTotalTime)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-8">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-800">
            오늘의 목표 달성률
          </h3>
          <span className="text-2xl font-extrabold text-black">
            {progressValue}%
          </span>
        </div>

        <Progress
          value={progressValue}
          color="success"
          aria-label="오늘의 목표 전체 진행률"
          className="w-full"
          classNames={{
            track: 'bg-gray-200',
          }}
          size="lg"
        />
      </div>
    </div>
  );
}
