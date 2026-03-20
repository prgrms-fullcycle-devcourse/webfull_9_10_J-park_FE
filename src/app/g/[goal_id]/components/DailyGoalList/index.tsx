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

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  return (
    <Card fullWidth>
      <CardHeader>할당량 목록</CardHeader>
      <CardBody>
        <div className="flex flex-col max-h-100 gap-4 overflow-auto scrollbar-hide">
          {dailyProgress.map(
            ({
              date,
              isCompleted,
              targetAmount,
              completedAmount,
              studyTime,
              isToday,
            }) => (
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
                  className="flex flex-col gap-1 w-full"
                >
                  <div className="text-sm">{isToday ? '오늘' : date}</div>
                  <Divider />
                  <div className="flex justify-between">
                    <div>
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
                    <div>
                      {completedAmount} / {targetAmount} 페이지
                    </div>
                    <div>{Math.round(studyTime / MINUTE_MILISECONDS)}분</div>
                  </div>
                </div>
              </Button>
            ),
          )}
        </div>
      </CardBody>
    </Card>
  );
}
