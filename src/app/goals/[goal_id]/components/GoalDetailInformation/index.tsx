'use client';

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  RangeCalendar,
} from '@heroui/react';
import { CalendarDate } from '@internationalized/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { GoalDetail, GoalDetailResponse } from '../../types';
import { api } from '@/lib/axios';
import { GoalParams } from '@/components/modals/GoalCreateFormModal';

interface Props {
  goalID: number;
  title: string;
  description: string;
  category: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  unit: string;
}

export default function GoalDetailInformation({
  goalID,
  title,
  description,
  totalAmount,
  startDate,
  endDate,
  unit,
}: Props) {
  const { mutate, isSuccess, isPending, isError } = useMutation<
    GoalDetail,
    Error,
    Partial<GoalParams>
  >({
    mutationKey: ['patch', 'goal'],
    mutationFn: (params) =>
      api
        .patch<GoalDetailResponse>(`/goals/${goalID}`, params)
        .then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const [newTotalAmount, setNewTotalAmount] = useState(totalAmount.toString());
  const [newStartDate] = useState(() => {
    const s = new Date(startDate);
    console.log();
    return new CalendarDate(s.getFullYear(), s.getMonth() + 1, s.getDate());
  });
  const [newEndDate, setNewEndDate] = useState(() => {
    const e = new Date(endDate);
    return new CalendarDate(e.getFullYear(), e.getMonth() + 1, e.getDate());
  });

  console.log(newStartDate, newEndDate);
  useEffect(() => {
    if (isSuccess) {
      addToast({
        title: '목표 정보수정',
        description: '목표 정보가 정상적으로 수정되어습니다',
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['goal', 'detail'] });
    }
    if (isError) {
      addToast({
        title: '목표 정보수정',
        description: '요청 실패했습니다. 잠시후 다시 시도해주세요',
        color: 'danger',
      });
    }
  }, [isSuccess, isError, queryClient]);

  return (
    <Card fullWidth id="goal-information" isDisabled={isPending}>
      <CardBody className="flex gap-4">
        <div>
          <small>{description}</small>
          <p className="text-xl font-bold">{title}</p>
        </div>
        <div className="flex gap-4">
          <Input
            size="lg"
            variant="flat"
            label="총량"
            labelPlacement="inside"
            value={newTotalAmount}
            onValueChange={setNewTotalAmount}
            endContent={<span>{unit}</span>}
          />
        </div>
        <RangeCalendar
          calendarWidth="full"
          classNames={{ content: 'bg-content1' }}
          nextButtonProps={{
            variant: 'bordered',
          }}
          prevButtonProps={{
            variant: 'bordered',
          }}
          value={{ start: newStartDate, end: newEndDate }}
          onChange={(value) => {
            setNewEndDate(value.end);
          }}
        />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          size="lg"
          color="success"
          className="text-white"
          isLoading={isPending}
          isDisabled={isPending}
          onPress={() =>
            mutate({
              totalAmount: Number(newTotalAmount),
              startDate: newStartDate.toString(),
              endDate: newEndDate.toString(),
            })
          }
        >
          저장
        </Button>
      </CardFooter>
    </Card>
  );
}
