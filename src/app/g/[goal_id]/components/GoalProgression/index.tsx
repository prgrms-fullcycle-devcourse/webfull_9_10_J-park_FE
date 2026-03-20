'use client';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DatePicker,
  Input,
  Progress,
} from '@heroui/react';
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
  const { rate, currentAmount, targetAmount } = progress;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(rate);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [rate]);

  return (
    <Card fullWidth>
      <CardHeader>목표 진행도</CardHeader>
      <CardBody className="pb-12">
        <h1 className="text-right">{value}%</h1>
        <Progress color="success" size="lg" value={value} />
        <div className="relative">
          <span
            className="absolute transition-all duration-500 ease-in-out"
            style={{ left: `${value}%` }}
          >
            <p>{value}</p>
            <small>페이지</small>
          </span>
          <span className="absolute right-0">
            <p>{targetAmount}</p>
            <small>페이지</small>
          </span>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-4 w-full">
          <Input label="현재 목표량" labelPlacement="outside-top" fullWidth />
          <DatePicker label="마감기한" labelPlacement="outside-top" fullWidth />
        </div>
      </CardFooter>
    </Card>
  );
}
