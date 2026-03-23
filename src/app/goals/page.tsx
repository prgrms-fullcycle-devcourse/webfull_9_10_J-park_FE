'use client';
import { Page } from '@/components/ui';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Progress,
} from '@heroui/react';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const sampleData = [
  {
    id: 1,
    title: '목표 1',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-20',
  },
  {
    id: 2,
    title: '목표 2',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-21',
  },
  {
    id: 3,
    title: '목표 3',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-22',
  },
  {
    id: 4,
    title: '목표 4',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-23',
  },
  {
    id: 5,
    title: '목표 5',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-24',
  },
  {
    id: 6,
    title: '목표 6',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-25',
  },
  {
    id: 7,
    title: '목표 7',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-26',
  },
  {
    id: 8,
    title: '목표 8',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-27',
  },
  {
    id: 9,
    title: '목표 9',
    description: '목표의 대한 설명 간략하게 여기다 작성',
    endDate: '2026-03-28',
  },
];

export default function Goal() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <Page.Title>목표 관리</Page.Title>
      {sampleData.length > 0 ? (
        <Card>
          <CardHeader>전체 목표</CardHeader>
          <CardBody>
            <Accordion
              className="w-full"
              selectionMode="multiple"
              itemClasses={{ trigger: 'py-2' }}
              defaultExpandedKeys={sampleData.map((n) => n.id.toString())}
            >
              {sampleData.map((goal) => (
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
        <div className="flex items-center justify-center w-full min-h-200 rounded-2xl bg-slate-50">
          <h1 className="text-lg text-slate-400">
            현재 등록된 목표가 없습니다
          </h1>
        </div>
      )}
    </div>
  );
}
