'use client';

import { useQuery } from '@tanstack/react-query';

import { FcClock } from 'react-icons/fc';
import { FcKindle } from 'react-icons/fc';
import { FcApproval } from 'react-icons/fc';

import { fetchTodayProgress } from '@/api/goalApi';
import { Button, Card } from '@heroui/react';
import TotalProgression from './components/TotalProgression';

export default function TodayStudyInfoCard() {
  const { data: progressData } = useQuery({
    queryKey: ['todayProgress'],
    queryFn: fetchTodayProgress,
  });

  if (!progressData) {
    return;
  }
  return (
    <Card className="animate-fadeIn">
      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-4">
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
                  {progressData.data.totalTime.toLocaleString()}시간
                </p>
                <small className="text-gray-600">오늘 총 공부시간</small>
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
                <small className="text-gray-600">오늘 총 데일리 목표</small>
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
                  {progressData.data.completedGoals.toLocaleString()}개
                </p>
                <small className="text-gray-600">오늘 완료한 데일리 목표</small>
              </div>
            </div>
          </div>
        </div>
        <TotalProgression />
      </div>
    </Card>
  );
}
