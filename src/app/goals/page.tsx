'use client';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Link,
  Progress,
  Skeleton,
} from '@heroui/react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import { Goal, GoalsResponse } from '@/types/api';
import { Page } from '@/components/ui';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

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

  return (
    <div className="flex flex-col h-full p-6 gap-4">
      <Skeleton isLoaded={!isLoading} className="rounded-xl w-36">
        <Page.Title>전체 목표</Page.Title>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="rounded-2xl">
        {data && data.length > 0 ? (
          <Card>
            <CardBody>
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
                      subtitle: 'text-slate-400',
                    }}
                  >
                    <p className="text-md">{goal.description}</p>
                    <div className="w-full flex justify-between items-center gap-2">
                      <Progress
                        color="success"
                        size="sm"
                        value={73}
                        label="진행도"
                        valueLabel="73%"
                        showValueLabel={true}
                        classNames={{ label: 'text-sm', value: 'text-sm' }}
                        className="col-span-2"
                      />
                      <DeleteConfirmationModal
                        goalTitle={goal.title}
                        goalID={goal.id}
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
      </Skeleton>
    </div>
  );
}
