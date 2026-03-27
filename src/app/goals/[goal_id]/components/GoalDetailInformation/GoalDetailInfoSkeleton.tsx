import { Card, CardBody, CardFooter, Skeleton } from '@heroui/react';

export default function GoalDetailInfoSkeletion() {
  return (
    <Card fullWidth id="goal-information">
      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-4 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-4 rounded-lg" />
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2 w-40">
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-4 rounded-lg" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Skeleton className="w-24 h-10 rounded-xl" />
      </CardFooter>
    </Card>
  );
}
