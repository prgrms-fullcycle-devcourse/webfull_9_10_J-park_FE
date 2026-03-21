'use client';
import { Card, CardBody, Progress } from '@heroui/react';
import { useEffect, useState } from 'react';
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
  const { rate, targetAmount, unit } = progress;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(rate);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [rate]);

  return (
    <Card fullWidth id="goal-progression">
      <CardBody className="pb-12">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">현재 진행도</p>
            <p>
              현재 마감 기한까지{' '}
              <b className="text-success">{period.daysRemaining}</b>일
              남았습니다.
            </p>
          </div>
          <span>
            <span className="font-bold text-6xl text-right">{value}</span>
            <span className="font-bold text-right">%</span>
          </span>
        </div>
        <Progress color="success" size="lg" value={value} />
        <div className="relative">
          <span
            className="absolute transition-all duration-500 ease-in-out"
            style={{ left: `${Math.max(0, value - 3)}%` }}
          >
            <p className="font-bold -mb-2">{value}</p>
            <small>{unit}</small>
          </span>
          <span className="absolute right-0">
            <p className="font-bold -mb-2">{targetAmount}</p>
            <small>{unit}</small>
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
