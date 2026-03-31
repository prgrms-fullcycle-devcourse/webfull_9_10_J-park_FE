'use client';
import { api } from '@/lib/axios';
import { Button, useDisclosure } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import { FaStop } from 'react-icons/fa6';
import { useParams, usePathname } from 'next/navigation';

import { EndTimerResponse, RunningTimerResponse } from '@/types/timer';
import Timer from './components/Timer';
import { STORAGE_KEYS } from '@/constants';

import { useMutation } from '@tanstack/react-query';
import { endTimer } from '@/api/timerApi';
import StopTimerModal from './components/StopTimerModal';

export default function FloatingTimer() {
  const params = useParams();
  const pathname = usePathname();
  const [goalID, setGoalID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [goalTitle, setGoalTitle] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const endMutation = useMutation({
    mutationFn: ({ goalID, amount }: { goalID: string; amount: number }) =>
      endTimer({
        goalId: Number(goalID),
        currentCompletedAmount: amount,
        isPaused: false,
      }),
  });

  useEffect(() => {
    if (localStorage) {
      const dailyGoalID = localStorage.getItem(STORAGE_KEYS.startedDailyGoalID);
      if (dailyGoalID) {
        fetchTimerData(dailyGoalID);
      }
    }
    async function fetchTimerData(goalID: string) {
      const res = await api.get<RunningTimerResponse>(
        `/timers?goalId=${goalID}`,
      );
      setStartDate(res.data.timer.startedAt);
      setTargetAmount(res.data.todayTargetAmount);
      setGoalTitle(res.data.goalTitle);
      setGoalID(goalID);

      return res;
    }
  }, []);

  const initialTimeMS = useMemo(() => {
    if (startDate) {
      const delta = Date.now() - new Date(startDate);
      return delta;
    }
  }, [startDate]);

  if (params.goal_id && params.daily_id) {
    return;
  }

  if (pathname === '/') {
    return;
  }

  if (!goalTitle || goalTitle !== '') {
    return;
  }

  return (
    <div
      className="absolute flex justify-center transition-all z-50 top-8 left-0 w-full"
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
        onClick={() => setIsMinimized((prev) => !prev)}
      >
        {isMinimized ? (
          <Timer initialTimeMS={initialTimeMS} isMinimized={isMinimized} />
        ) : (
          <>
            <div className="w-1/3">
              <Timer initialTimeMS={initialTimeMS} />
              <StopTimerModal goalID={goalID} targetAmount={targetAmount} />
            </div>
            <div className="flex flex-col min-w-2/3 max-w-2/3justify-between col-start-2 col-span-2 px-0">
              <div className="overflow-hidden font-bold text-lg w-full">
                <p
                  className="text-nowrap animate-slide-loop"
                  style={{
                    width: `${goalTitle.length > 24 ? goalTitle.length * 12 : 0}px`,
                  }}
                >
                  {goalTitle}
                </p>
              </div>
              <div className="flex items-center text-slate-200 gap-2">
                <span>할당량</span>
                <span className="flex items-baseline">
                  <b className="text-white mr-1">234</b>
                  <small>페이지</small>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
