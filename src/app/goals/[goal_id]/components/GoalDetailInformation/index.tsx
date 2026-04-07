'use client';

import { addToast, Button, Input, RangeCalendar } from '@heroui/react';
import { CalendarDate } from '@internationalized/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { GoalDetail, GoalDetailResponse } from '../../types';
import { api } from '@/lib/axios';

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
  category,
  totalAmount,
  startDate,
  endDate,
  unit,
}: Props) {
  const { mutate, isSuccess, isPending, isError } = useMutation<
    GoalDetail,
    Error,
    {
      totalAmount: number;
      startDate: string;
      endDate: string;
    }
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
    return new CalendarDate(s.getFullYear(), s.getMonth() + 1, s.getDate());
  });
  const [newEndDate, setNewEndDate] = useState(() => {
    const e = new Date(endDate);
    return new CalendarDate(e.getFullYear(), e.getMonth() + 1, e.getDate());
  });
  const [hasChanged, setHasChanged] = useState(false);
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
    <div>
      <div className="flex justify-between gap-4 p-6">
        <div>
          <Input
            variant="bordered"
            value={newTotalAmount}
            onValueChange={(v) => {
              setNewTotalAmount(v);
              setHasChanged(true);
            }}
            classNames={{
              input: 'font-black text-2xl border-none',
              inputWrapper: 'border-none shadow-none min-h-8 h-8 p-0',
            }}
          />
          <small className='"text-gray-600 -mt-2'>총 분량</small>
        </div>
        <div className="text-right">
          <p className="font-black text-xl">{unit}</p>
          <small className='"text-gray-600 -mt-2'>{category}</small>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 px-6">
        <RangeCalendar
          className="mx-auto"
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
            setHasChanged(true);
          }}
        />
        <Button
          className="ml-auto shrink-0"
          color="primary"
          radius="full"
          isLoading={isPending}
          isDisabled={isPending || !hasChanged}
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
      </div>
    </div>
  );
}
