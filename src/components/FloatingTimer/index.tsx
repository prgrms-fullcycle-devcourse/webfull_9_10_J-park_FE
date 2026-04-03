'use client';
import { api } from '@/lib/axios';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { RunningTimerData, RunningTimerResponse } from '@/types/timer';
import Timer from './components/Timer';

import StopTimerModal from './components/StopTimerModal';
import { useQuery } from '@tanstack/react-query';

export default function FloatingTimer() {
  const {
    data: currentTimer,
    isLoading,
    isError,
  } = useQuery<RunningTimerData>({
    queryKey: ['goals', 'timer'],
    queryFn: () =>
      api.get<RunningTimerResponse>('/timers').then((res) => res.data),
  });

  const params = useParams();
  const [isMinimized, setIsMinimized] = useState(false);

  const initialTimeMS = useMemo(() => {
    if (currentTimer?.timer?.startedAt) {
      const accumulatedTime = currentTimer.todayStudyDuration || 0;

      const sessionDelta =
        Date.now() - new Date(currentTimer.timer.startedAt).getTime();

      return accumulatedTime + sessionDelta;
    }
    return 0;
  }, [currentTimer?.timer?.startedAt, currentTimer?.todayStudyDuration]);

  if (params.goal_id && params.daily_id) {
    return null;
  }

  if (!currentTimer || isLoading || isError) {
    return null;
  }

  const { goalId, goalTitle } = currentTimer;

  return (
    <div
      className="absolute flex justify-center transition-all top-8 left-0 w-full z-40"
      style={{
        top: `${isMinimized ? '0' : '2rem'}`,
      }}
    >
      <div
        className="flex transition-all items-center w-full bg-gray-600 text-white shadow-lg rounded-2xl"
        style={{
          width: `${isMinimized ? '20%' : '100%'}`,
          height: `${isMinimized ? '32px' : 'auto'}`,
          padding: `${isMinimized ? '0rem' : '1rem'}`,
          justifyContent: `${isMinimized ? 'center' : 'space-between'}`,
        }}
      >
        {isMinimized ? (
          <div onClick={() => setIsMinimized((prev) => !prev)}>
            <Timer initialTimeMS={initialTimeMS} isMinimized={isMinimized} />
          </div>
        ) : (
          <>
            <div className="w-1/3">
              <Timer initialTimeMS={initialTimeMS} />
              <StopTimerModal
                goalID={goalId}
                targetAmount={currentTimer.todayTargetAmount}
              />
            </div>
            <div
              className="flex flex-col min-w-2/3 max-w-2/3justify-between col-start-2 col-span-2 px-0"
              onClick={() => setIsMinimized((prev) => !prev)}
            >
              <div className="overflow-hidden font-bold text-lg w-full">
                <p
                  className="text-nowrap animate-slide-loop text-xl font-black"
                  style={{
                    width: `${goalTitle.length > 24 ? goalTitle.length * 12 : 0}px`,
                  }}
                >
                  {goalTitle}
                </p>
              </div>
              <div className="flex items-center text-slate-200 gap-2 text-sm">
                <span>할당량</span>
                <span className="flex items-baseline">
                  <b className="text-white mr-1">
                    {currentTimer.todayTargetAmount}
                  </b>
                  <span>페이지</span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
