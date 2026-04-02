'use client';
import { Button, Link } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import { Goal, GoalsResponse } from '@/types/api';

import { useEffect, useState } from 'react';
import { FcSurvey } from 'react-icons/fc';

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
        <p className="p-6 pb-2 font-black text-xl">전제 목표</p>
        {data &&
          data.length > 0 &&
          data.map((goal) => (
            <div key={goal.id}>
              <small className="px-6">
                {new Date(goal.endDate).toLocaleDateString('ko-kr', {
                  month: 'long',
                  day: 'numeric',
                })}
              </small>
              <Button
                as={Link}
                href={`goals/${goal.id}`}
                variant="light"
                radius="none"
                className="w-full h-full flex items-center gap-4 px-6 py-4"
              >
                <Button
                  radius="full"
                  className="p-0 hover:cursor-default bg-primary"
                  isIconOnly
                  disableAnimation
                  disableRipple
                >
                  <FcSurvey size={24} />
                </Button>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="truncate max-w-full font-black text-xl -mb-2">
                      {goal.title}
                    </p>
                    <small className="text-gray-600">{goal.description}</small>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl -mb-2">
                      {goal.progressRate}%
                    </p>
                    <small className="text-gray-600">진행율</small>
                  </div>
                </div>
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
