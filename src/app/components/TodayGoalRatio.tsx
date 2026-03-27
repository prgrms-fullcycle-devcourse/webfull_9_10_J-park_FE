'use client';

import { useEffect, useState, useMemo } from 'react';
import { Progress } from '@heroui/react';
import { formatMilliseconds } from '@/lib/utils';
import { useTimerStore } from '@/stores/useTimerStore';

const DUMMY_PROGRESS = {
  totalTime: 93847,
  totalGoals: 3,
  completedGoals: 2,
  ratio: 66,
};

export default function TodayGoalRatio() {
  const { playingId, startTime, recordedTimes } = useTimerStore();

  const totalRecordedTime = useMemo(() => {
    const safeRecordedTimes = recordedTimes || {};
    return Object.values(safeRecordedTimes).reduce(
      (acc: number, curr: number) => acc + curr,
      0,
    );
  }, [recordedTimes]);

  const baseTotalTime = DUMMY_PROGRESS.totalTime + totalRecordedTime;
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
      setProgressValue(DUMMY_PROGRESS.ratio);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

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

        <div className="relative mt-2">
          <span
            className="absolute transition-all duration-500 ease-in-out text-black"
            style={{ left: `${Math.max(0, progressValue - 3)}%` }}
          >
            <p className="font-bold -mb-1 text-center">
              {DUMMY_PROGRESS.completedGoals} 개
            </p>
          </span>

          <span className="absolute right-0 text-black text-right">
            <p className="font-bold -mb-1">{DUMMY_PROGRESS.totalGoals} 개</p>
          </span>
        </div>
      </div>
    </div>
  );
}
