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

const sample = [
  {
    date: '2026-03-14',
    targetAmount: 3, // 해당 일자의 목표 할당량
    completedAmount: 3, // 실제 완료한 분량
    isCompleted: true,
    studyTime: 39334748, // 해당 일자의 해당 목표 공부 시간
    isToday: false,
  },
  {
    date: '2026-03-15',
    targetAmount: 4,
    completedAmount: 4,
    isCompleted: true,
    studyTime: 2733902,
    isToday: false,
  },
  {
    date: '2026-03-16',
    targetAmount: 3,
    completedAmount: 3,
    isCompleted: true,
    studyTime: 2733902,
    isToday: false,
  },
  {
    date: '2026-03-17',
    targetAmount: 5,
    completedAmount: 7,
    isCompleted: true,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-18',
    targetAmount: 5,
    completedAmount: 3,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-19',
    targetAmount: 3,
    completedAmount: 2,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-20',
    targetAmount: 3,
    completedAmount: 3,
    isCompleted: true,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-21',
    targetAmount: 3,
    completedAmount: 2,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-22',
    targetAmount: 3,
    completedAmount: 0,
    isCompleted: false,
    studyTime: 2836238,
    isToday: true,
  },
  {
    date: '2026-03-23',
    targetAmount: 3,
    completedAmount: 3,
    isCompleted: true,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-24',
    targetAmount: 3,
    completedAmount: 2,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-25',
    targetAmount: 3,
    completedAmount: 0,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-26',
    targetAmount: 3,
    completedAmount: 3,
    isCompleted: true,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-27',
    targetAmount: 3,
    completedAmount: 2,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-28',
    targetAmount: 3,
    completedAmount: 0,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-29',
    targetAmount: 3,
    completedAmount: 3,
    isCompleted: true,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-30',
    targetAmount: 3,
    completedAmount: 2,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
  {
    date: '2026-03-31',
    targetAmount: 3,
    completedAmount: 0,
    isCompleted: false,
    studyTime: 2836238,
    isToday: false,
  },
];

const MINUTE_MILISECONDS = 60000;

export default function DailyGoalList() {
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
        <div className="flex flex-col max-h-100 gap-4  overflow-auto scrollbar-hide">
          {sample.map(
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
                className="shrink-0 h-full py-1"
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
