'use client';
import { useEffect, useRef } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Link,
  Progress,
} from '@heroui/react';

const MINUTE_MILISECONDS = 60000;

interface Props {
  dailyProgress: {
    date: string;
    isCompleted: boolean;
    targetAmount: number;
    completedAmount: number;
    studyTime: number;
    isToday: boolean;
  }[];
}

export default function DailyGoalList({ dailyProgress }: Props) {
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
    <Card fullWidth id="daily-goal-list">
      <CardHeader className="font-bold">할당량 리스트</CardHeader>
      <CardBody>
        <div className="flex flex-col max-h-100 gap-4 overflow-auto scrollbar-hide shadow-[inset_0_10px_10px_-15px_rgba(0,0,0,0.3),inset_0_-10px_10px_-15px_rgba(0,0,0,0.3)]">
          {dailyProgress.map(
            ({
              date,
              isCompleted,
              targetAmount,
              completedAmount,
              studyTime,
              isToday,
            }) => {
              const currentProg = completedAmount / targetAmount;
              const progressColor =
                currentProg > 0.7
                  ? 'success'
                  : currentProg > 0.3
                    ? 'warning'
                    : 'danger';
              return (
                <Button
                  variant="light"
                  fullWidth
                  size="lg"
                  key={date}
                  as={Link}
                  className="shrink-0 h-full py-1 px-0"
                >
                  <div
                    ref={isToday ? todayRef : null}
                    className="grid grid-row-2 flex-col gap-1 w-full"
                  >
                    <div className="row-span-1 text-sm text-slate-400">
                      {isToday ? '오늘' : date}
                      <Divider />
                    </div>
                    <div className="grid grid-cols-5 row-span-1 items-center">
                      <div className="col-span-1">
                        {isCompleted ? (
                          <Chip size="sm" variant="bordered" color="success">
                            달성
                          </Chip>
                        ) : (
                          <Chip size="sm" variant="bordered" color="warning">
                            미달성
                          </Chip>
                        )}
                      </div>
                      <div className="col-span-3">
                        <Progress
                          className="w-full"
                          size="md"
                          color={progressColor}
                          value={completedAmount}
                          showValueLabel={true}
                          label={`현재 ${completedAmount}/${targetAmount} 페이지 완료`}
                          maxValue={targetAmount}
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <b className="text-2xl">
                          {Math.round(studyTime / MINUTE_MILISECONDS)}
                        </b>
                        <small>분</small>
                      </div>
                    </div>
                  </div>
                </Button>
              );
            },
          )}
        </div>
      </CardBody>
    </Card>
  );
}
