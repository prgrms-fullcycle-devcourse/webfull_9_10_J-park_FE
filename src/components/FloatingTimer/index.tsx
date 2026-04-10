'use client';

import { api } from '@/lib/axios';
import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { RunningTimerData, RunningTimerResponse } from '@/types/timer';
import Timer from './components/Timer';

import StopTimerModal from './components/StopTimerModal';
import { useQuery } from '@tanstack/react-query';
import { useTimerStore } from '@/stores/useTimerStore';
import { IoRemove } from 'react-icons/io5';

export default function FloatingTimer() {
  const router = useRouter();
  const { playingId } = useTimerStore();

  const {
    data: currentTimer,
    isLoading,
    isError,
  } = useQuery<RunningTimerData>({
    queryKey: ['goals', 'timer'],
    queryFn: () =>
      api.get<RunningTimerResponse>('/timers').then((res) => res.data),
    enabled: !!playingId,
  });

  const params = useParams();
  const [isMinimized, setIsMinimized] = useState(false);

  const initialTimeMS = useMemo(() => {
    return currentTimer?.todayStudyDuration || 0;
  }, [currentTimer?.todayStudyDuration]);

  if (params.goal_id && params.daily_id) return null;
  if (!playingId || !currentTimer || isLoading || isError) return null;

  const { goalId, goalTitle, todayTargetAmount, goalLogId } = currentTimer;

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/goals/${goalId}/${goalLogId}`);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-500 ease-in-out
        ${
          isMinimized
            ? 'top-8 right-8 w-32 h-12 rounded-full shadow-lg cursor-pointer' // 💡 글자가 커졌으므로 w-28 -> w-32로 살짝 넓힘
            : 'top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 rounded-2xl shadow-2xl'
        }
        bg-gray-900/80 backdrop-blur-md border border-white/10 text-white flex items-center overflow-hidden
      `}
    >
      {isMinimized ? (
        <div
          className="flex items-center justify-center w-full h-full"
          onClick={() => setIsMinimized(false)}
        >
          <div className="text-emerald-400 font-mono text-lg font-medium [font-variant-numeric:tabular-nums]">
            <Timer initialTimeMS={initialTimeMS} isMinimized={true} />
          </div>
        </div>
      ) : (
        <div className="flex items-center px-6 h-full w-full">
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={handleNavigate}
          >
            <p className="font-bold text-lg truncate tracking-tight">
              {goalTitle}
            </p>
          </div>

          <div className="flex items-center shrink-0 ml-4">
            <div
              className="text-emerald-400 font-mono text-lg font-medium [font-variant-numeric:tabular-nums] cursor-pointer mr-8"
              onClick={handleNavigate}
            >
              <Timer initialTimeMS={initialTimeMS} />
            </div>

            <div
              className="flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <StopTimerModal
                goalID={goalId}
                targetAmount={todayTargetAmount}
              />

              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 cursor-pointer"
              >
                <IoRemove size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
