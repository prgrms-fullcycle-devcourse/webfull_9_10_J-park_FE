'use client';
import { useRef } from 'react';
import { Button } from '@heroui/react';
import { FcSurvey } from 'react-icons/fc';
import Link from 'next/link';

interface Props {
  goalID: number;
  dailyProgress: {
    goalLogId: number;
    date: string;
    isCompleted: boolean;
    targetAmount: number;
    completedAmount: number;
    studyTime: number;
    isToday: boolean;
  }[];
}

export default function DailyGoalList({ goalID, dailyProgress }: Props) {
  const todayRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (todayRef.current) {
  //     todayRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',
  //     });
  //   }
  // }, []);

  return (
    <div className="bg-white">
      <small className="px-6 text-gray-600">데일리 목표</small>
      {dailyProgress.map(
        ({
          date,
          isCompleted,
          targetAmount,
          completedAmount,
          studyTime,
          isToday,
          goalLogId,
        }) => {
          return (
            <Link
              key={goalLogId}
              href={`/goals/${goalID}/${goalLogId}`}
              className="w-full h-full flex items-center gap-4 shrink-0 px-6 py-4"
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
                <div className={`${isToday ? 'text-primary' : ''}`}>
                  <p className="truncate font-black text-xl -mb-2">
                    {new Date(date).toLocaleDateString('ko-kr', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <small className="text-gray-600">
                    {Math.round(studyTime / 1000 / 60 / 60).toLocaleString()}
                    시간
                  </small>
                </div>
                <div className="text-right">
                  <p
                    className={`font-black text-xl -mb-2 ${isToday ? 'text-primary' : 'text-gray-600'}`}
                  >
                    {isCompleted ? '달성' : '미달성'}
                  </p>
                  <small
                    className={`${isToday ? 'text-primary' : 'text-gray-600'}`}
                  >
                    {Math.round((completedAmount / targetAmount) * 100)}%
                  </small>
                </div>
              </div>
            </Link>
          );
        },
      )}
    </div>
  );
}
