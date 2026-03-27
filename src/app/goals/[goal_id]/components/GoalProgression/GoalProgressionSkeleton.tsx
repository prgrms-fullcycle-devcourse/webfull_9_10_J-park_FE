import { Card, CardBody, Skeleton } from '@heroui/react';

export default function GoalProgressionSkeleton() {
  return (
    <Card fullWidth id="goal-progression">
      <CardBody className="pb-12 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-5 rounded-lg" />
            <Skeleton className="w-56 h-4 rounded-lg" />
          </div>
          <div className="flex items-end gap-1">
            <Skeleton className="w-20 h-12 rounded-lg" />
            <Skeleton className="w-6 h-8 rounded-lg" />
          </div>
        </div>
        <Skeleton className="w-full h-5 rounded-full" />
        <div className="relative h-10">
          <Skeleton className="absolute left-1/3 w-12 h-8 rounded-lg" />
          <Skeleton className="absolute right-0 w-12 h-8 rounded-lg" />
        </div>
      </CardBody>
    </Card>
  );
}
