'use client';

import {
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
  title: string;
  description: string;
  category: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  unit: string;
}

export default function GoalDetailInformation({
  title,
  description,
  totalAmount,
  startDate,
  endDate,
  unit,
}: Props) {
  const { mutate, isSuccess } = useMutation<
    GoalDetail,
    Error,
    Partial<GoalParams>
  >({
    mutationKey: ['patch', 'goal'],
    mutationFn: (params) =>
      api.patch<GoalDetailResponse>('/goals', params).then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const [newTotalAmount, setNewTotalAmount] = useState(totalAmount.toString());
  const [newStartDate] = useState(() => {
    const s = new Date(startDate);
    return new CalendarDate(s.getFullYear(), s.getMonth(), s.getDay());
  });
  const [newEndDate, setNewEndDate] = useState(() => {
    const e = new Date(endDate);
    return new CalendarDate(e.getFullYear(), e.getMonth(), e.getDay());
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['goal', 'detail'] });
    }
  }, [isSuccess, queryClient]);

  return (
    <Card fullWidth id="goal-information">
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
          minValue={newStartDate}
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
          onPress={() =>
            mutate({
              totalAmount: Number(newTotalAmount),
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
