'use client';

import { useQuery } from '@tanstack/react-query';
import { Button, Image, Link } from '@heroui/react';
import { FcClock, FcSurvey } from 'react-icons/fc';

import { api } from '@/lib/axios';
import { Goal, GoalsResponse } from '@/types/api';
import GoalItemSwipeable from './components/GoalItemSwipeable';
import { MyProfileResponse, User } from '@/types/user';
import { formatStudyTime } from '@/lib/utils';

export default function Goals() {
  const { data, isError } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: () =>
      api.get<GoalsResponse>('goals').then((res) => res.data.goals),
  });

  const userInfo = useQuery<User>({
    queryKey: ['users', 'me'],
    queryFn: () =>
      api.get<MyProfileResponse>('/users/me').then((res) => res.data),
  });

  if (isError || userInfo.isError) {
    return (
      <div className="flex items-center justify-center w-full min-h-200 rounded-2xl bg-slate-50">
        <h1 className="text-lg text-slate-400">
          서버에 애러가 발생했습니다. 잠시 후 다시 시도해주세요.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full bg-slate-50 max-h-screen">
      <div className="sticky top-0 w-full">
        <div className="w-full h-full flex flex-col">
          <div className="flex gap-4 mx-6 mt-6 my-2">
            <Button
              className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
              as={Link}
              isIconOnly
              disableAnimation
              disableRipple
            >
              <FcClock size={24} />
            </Button>
            <div className="flex w-full justify-between">
              <div>
                <p className="truncate font-black text-xl -mb-2">
                  {formatStudyTime(Number(userInfo.data?.totalTime || 0))}
                </p>
                <small className="text-gray-600">누적 공부시간</small>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mx-6 mb-6 my-2">
            <Button
              className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
              isIconOnly
              disableAnimation
              disableRipple
            >
              <FcSurvey size={24} />
            </Button>
            <div className="flex w-full justify-between">
              <div>
                <p className="truncate font-black text-xl -mb-2">
                  {data?.length.toLocaleString()}개
                </p>
                <small className="text-gray-600">총 목표</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="animate-fadeIn transition-all duration-500 ease-in-out min-h-full h-full w-full bg-white rounded-t-2xl -mt-4">
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
