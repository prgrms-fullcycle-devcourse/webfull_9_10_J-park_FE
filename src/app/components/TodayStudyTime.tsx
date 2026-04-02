'use client';

import { useQuery } from '@tanstack/react-query';

import { FcClock } from 'react-icons/fc';
import { FcKindle } from 'react-icons/fc';
import { FcApproval } from 'react-icons/fc';

import { fetchTodayProgress } from '@/api/goalApi';
import { Button, Card } from '@heroui/react';

export default function TodayTotalTime() {
  const { data: progressData } = useQuery({
    queryKey: ['todayProgress'],
    queryFn: fetchTodayProgress,
  });

  if (!progressData) {
    return;
  }
  return (
    <Card className="animate-fadeIn">
      <div className="flex flex-col p-6 gap-4">
        <div className="flex gap-4">
          <Button
            className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
            isIconOnly
            disableAnimation
            disableRipple
          >
            <FcClock size={24} />
          </Button>
          <div className="flex w-full justify-between">
            <div>
              <p className="truncate font-black text-xl -mb-2">
                {progressData.data.totalTime}시간
              </p>
              <small className="text-gray-600">누적 공부시간</small>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
            isIconOnly
            disableAnimation
            disableRipple
          >
            <FcKindle size={24} />
          </Button>
          <div className="flex w-full justify-between">
            <div>
              <p className="truncate font-black text-xl -mb-2">
                {progressData.data.totalGoals}개
              </p>
              <small className="text-gray-600">총 목표</small>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
            isIconOnly
            disableAnimation
            disableRipple
          >
            <FcApproval size={24} />
          </Button>
          <div className="flex w-full justify-between">
            <div>
              <p className="truncate font-black text-xl -mb-2">
                {progressData.data.completedGoals}개
              </p>
              <small className="text-gray-600">완료한 목표</small>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
