'use client';
import { Card, CardBody, CardHeader } from '@heroui/react';
import Link from 'next/link';

interface Props {
  goals: { id: number; title: string; todayQuota: number }[];
}

export default function MyGoals({ goals }: Props) {
  return (
    <Card>
      <CardHeader>오늘의 목표</CardHeader>
      <CardBody className="gap-2">
        {goals.map((goal) => (
          <Link
            key={goal.id}
            href={`goals/${goal.id}`}
            className="flex justify-between h-full p-2 px-4 border-b-1 border-slate-200"
          >
            <span>
              <p className="text-lg max-w-full text-ellipsis">{goal.title}</p>
              <p>오늘 할당량</p>
            </span>
            <span>
              <p>
                <b className="text-lg">{goal.todayQuota}</b> 페이지
              </p>
            </span>
          </Link>
        ))}
      </CardBody>
    </Card>
  );
}
