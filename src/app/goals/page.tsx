'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import { Goal, GoalsResponse } from '@/types/api';

import GoalItemSwipeable from './components/GoalItemSwipeable';
import { FcDown } from 'react-icons/fc';

export default function Goals() {
  const [top, setTop] = useState(0);

  const { data, isError } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: () =>
      api.get<GoalsResponse>('goals').then((res) => res.data.goals),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTop(80);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full min-h-200 rounded-2xl bg-slate-50">
        <h1 className="text-lg text-slate-400">
          서버에 애러가 발생했습니다. 잠시 후 다시 시도해주세요.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full bg-slate-50 gap-4 min-h-screen max-h-screen">
      <div className="w-full h-full p-6 flex flex-col">
        <small className="text-gray-600">등록된 목표들</small>
        <p className="truncate max-w-full font-black text-2xl -mb-2">
          {data?.length}개
        </p>
      </div>
      <div
        className="absolute transition-all duration-500 ease-in-out min-h-full w-full bg-white rounded-t-2xl"
        style={{
          top: top,
        }}
      >
        <p className="p-6 pb-2 font-black text-xl">전체 목표</p>
        {data &&
          data.length > 0 &&
          data.map((goal) => <GoalItemSwipeable key={goal.id} goal={goal} />)}
        {!data ||
          (data.length === 0 && (
            <div>
              <p className="p-6 text-gray-400">등록한 목표가 없습니다</p>
            </div>
          ))}
      </div>
    </div>
  );
}
