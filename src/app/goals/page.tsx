'use client';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Progress,
  Skeleton,
} from '@heroui/react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import { Goal, GoalsResponse } from '@/types/api';
import { Page } from '@/components/ui';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import GoalsSkeleton from './components/GoalsSkeletion';

export default function Goals() {
  const { data, isError, isLoading } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: () =>
      api.get<GoalsResponse>('goals').then((res) => res.data.goals),
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full min-h-200 rounded-2xl bg-slate-50">
        <h1 className="text-lg text-slate-400">
          서버에 애러가 발생했습니다. 잠시 후 다시 시도해주세요.
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return <GoalsSkeleton />;
  }

  return (
    <div className="flex flex-col h-full p-6 gap-4">
      <Page.Title>전체 목표</Page.Title>
      {data && data.length > 0 ? (
        <Card>
          <CardBody className=" scrollbar-hide">
            <Accordion
              className="w-full"
              selectionMode="multiple"
              itemClasses={{ trigger: 'py-2' }}
              defaultExpandedKeys={data.map((n) => n.id.toString())}
            >
              {data.map((goal) => (
                <AccordionItem
                  key={goal.id}
                  title={goal.title}
                  subtitle={goal.endDate}
                  classNames={{
                    content: 'px-4 mb-2 bg-slate-50 rounded-2xl',
                    title: 'font-bold',
                    titleWrapper: 'w-full truncate',
                    subtitle: 'text-slate-400',
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-md w-full truncate">
                      {goal.description}
                    </p>
                    <DeleteConfirmationModal
                      goalTitle={goal.title}
                      goalID={goal.id}
                    />
                  </div>
                  <div className="w-full flex justify-between items-center gap-2">
                    <Progress
                      color="success"
                      size="sm"
                      value={goal.progressRate}
                      label="진행도"
                      valueLabel={`${goal.progressRate}%`}
                      showValueLabel={true}
                      classNames={{ label: 'text-sm', value: 'text-sm' }}
                      className="col-span-2"
                    />
                  </div>
                  <Button
                    fullWidth
                    as={Link}
                    href={`goals/${goal.id}`}
                    variant="flat"
                    className="my-2"
                  >
                    상세보기
                  </Button>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>
      ) : (
        <div className="flex items-center justify-center w-full rounded-2xl bg-slate-50">
          <h1 className="text-lg text-slate-400 py-12">
            현재 등록된 목표가 없습니다
          </h1>
        </div>
      )}
    </div>
  );
}
