'use client';
import { Card, CardBody, Skeleton } from '@heroui/react';

interface Props {
  size?: number;
}
export default function GoalsSkeleton({ size = 4 }: Props) {
  return (
    <div className="flex flex-col p-6 gap-4">
      <Skeleton className="w-36 min-h-8 rounded-lg" />
      <Card className="p-2">
        <CardBody className="flex flex-col gap-2">
          {Array(size)
            .fill(0)
            .map((_, i) => (
              <div key={'goals-' + i}>
                <Skeleton className="w-full min-h-6 rounded-lg" />
                <Skeleton className="w-36 min-h-4 rounded-lg" />
                <div className="flex flex-col gap-2 bg-slate-50 rounded-2xl p-4">
                  <div className="flex justify-between">
                    <Skeleton className="w-16 min-h-6 rounded-lg" />
                    <Skeleton className="w-6 min-h-6 rounded-lg" />
                  </div>
                  <div className="flex">
                    <Skeleton className="w-full min-h-6 rounded-lg" />
                  </div>
                  <Skeleton className="w-full min-h-12 rounded-2xl mt-2" />
                </div>
              </div>
            ))}
        </CardBody>
      </Card>
    </div>
  );
}
