'use client';
import { STORAGE_KEYS } from '@/constants';
import { api } from '@/lib/axios';
import { Button } from '@heroui/react';

import { FaStop } from 'react-icons/fa6';
import Timer from './components/Timer';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { RunningTimerResponse } from '@/types/timer';

export default function FloatingTimer() {
  const params = useParams();
  const [startDate, setStartDate] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

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
              <Button
                className="shrink-0"
                radius="full"
                color="danger"
                startContent={<FaStop />}
              >
                종료
              </Button>
            </div>
            <div className="flex flex-col max-w-2/3 justify-between col-start-2 col-span-2 px-0">
              <div className="overflow-hidden font-bold text-lg w-full">
                <p
                  className="text-nowrap animate-slide-loop"
                  style={{
                    width: `${'목표 명 여기다 작성 쭉 길게 작성해서 자동으로 스크롤 되게 만들기'.length * 12}px`,
                  }}
                >
                  목표 명 여기다 작성 쭉 길게 작성해서 자동으로 스크롤 되게
                  만들기
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
