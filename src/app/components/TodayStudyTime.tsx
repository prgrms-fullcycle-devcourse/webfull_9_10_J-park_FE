'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatMilliseconds } from '@/lib/utils';
import { useTimerStore } from '@/stores/useTimerStore';

import { fetchTodayProgress } from '@/api/goalApi';

export default function TodayTotalTime() {
  const { playingId, startTime } = useTimerStore();

  const { data: progressData } = useQuery({
    queryKey: ['todayProgress'],
    queryFn: fetchTodayProgress,
  });

  const safeData = progressData?.data || {
    totalTime: 0,
  };

  const baseTotalTime = safeData.totalTime;
  const [liveTotalTime, setLiveTotalTime] = useState(baseTotalTime);

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

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-bold text-gray-800">오늘 총 공부시간</h3>

      <div className="flex items-center justify-center w-full py-8 bg-gray-200 rounded-md">
        <span className="text-5xl font-extrabold text-black tracking-widest">
          {formatMilliseconds(liveTotalTime)}
        </span>
      </div>
    </div>
  );
}
