'use client';
import { Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import { FcPositiveDynamic } from 'react-icons/fc';
import { FcCalendar } from 'react-icons/fc';
import { FcClock } from 'react-icons/fc';
import { FcInspection } from 'react-icons/fc';

interface Props {
  progress: {
    rate: number; // 진행률
    currentAmount: number; // 현재 진행도
    targetAmount: number; // 목표
    totalStudyTime: number; // 해당 목표의 총 공부 시간
    unit: string;
  };
  period: {
    startDate: string;
    endDate: string;
    daysRemaining: number;
  };
}

export default function GoalProgression({ progress, period }: Props) {
  const [value, setValue] = useState(0);
  const { rate } = progress;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(rate);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [rate]);

  return (
    <div>
      <div className="flex bg-white items-center gap-4 px-6 py-2">
        <Button
          radius="full"
          variant="light"
          className="p-0 bg-slate-100 hover:cursor-default"
          isIconOnly
          disableAnimation
          disableRipple
        >
          <FcCalendar size={24} />
        </Button>
        <div>
          <small className="text-gray-600 -mb-2">목표 기한까지 남은 시간</small>
          <p className="font-black text-xl">{period.daysRemaining}일</p>
        </div>
      </div>
      <div className="flex bg-white items-center gap-4 p-6 py-2">
        <Button
          radius="full"
          variant="light"
          className="p-0 bg-slate-100 hover:cursor-default"
          isIconOnly
          disableAnimation
          disableRipple
        >
          <FcPositiveDynamic size={24} />
        </Button>
        <div>
          <small className="text-gray-600 -mb-2">지금까지 진행 완료</small>
          <p className="font-black text-xl">{value}%</p>
        </div>
      </div>
      <div className="flex bg-white items-center gap-4 p-6 py-2">
        <Button
          radius="full"
          variant="light"
          className="p-0 bg-slate-100 hover:cursor-default"
          isIconOnly
          disableAnimation
          disableRipple
        >
          <FcInspection size={24} />
        </Button>
        <div>
          <small className="text-gray-600 -mb-2">
            지금까지 완료한 {progress.unit}
          </small>
          <p className="font-black text-xl">
            {progress.currentAmount.toLocaleString()}
            {progress.unit}
          </p>
        </div>
      </div>
      <div className="flex bg-white items-center gap-4 p-6 py-2">
        <Button
          radius="full"
          variant="light"
          className="p-0 bg-slate-100 hover:cursor-default"
          isIconOnly
          disableAnimation
          disableRipple
        >
          <FcClock size={24} />
        </Button>
        <div>
          <small className="text-gray-600 -mb-2">총 공부시간</small>
          <p className="font-black text-xl">
            {Math.round(
              progress.totalStudyTime / 1000 / 60 / 60,
            ).toLocaleString()}
            시간
          </p>
        </div>
      </div>
    </div>
  );
}
