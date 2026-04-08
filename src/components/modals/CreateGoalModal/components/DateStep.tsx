import { addToast, Button, RangeCalendar } from '@heroui/react';
import { useLocalCreateGoal } from '../local-store/useLocalCreateGoal';
import { useMutation } from '@tanstack/react-query';
import { CreateGoalResponse } from '@/types/api';
import { useCallback } from 'react';
import { api } from '@/lib/axios';

interface Props {
  onClose: () => void;
}

export default function DateStep({ onClose }: Props) {
  const {
    title,
    detail,
    category,
    totalAmount,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    reset,
  } = useLocalCreateGoal();

  const { mutate, isPending } = useMutation<
    CreateGoalResponse,
    Error,
    {
      title: string;
      detail: string;
      categoryId: number;
      totalAmount: number;
      startDate: string;
      endDate: string;
    }
  >({
    mutationFn: (params) => api.post('/goals', params),
    onSuccess: (_, { title }) => {
      onClose();

      addToast({
        color: 'success',
        title: '목표가 등록되었습니다',
        description: `"${title}" 목표가 성공적으로 생성되었습니다`,
      });

      reset();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: () => {
      addToast({
        color: 'danger',
        title: '목표를 등록하지 못했습니다.',
        description: `문제가 발생했습니다. 잠시후 다시 시도해주세요`,
      });
    },
  });

  const submit = useCallback(() => {
    mutate({
      title,
      detail,
      categoryId: category,
      totalAmount,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    });
  }, [title, detail, category, totalAmount, startDate, endDate, mutate]);

  return (
    <div className="animate-fadeIn h-full flex flex-col bg-white">
      <div className="p-6">
        <h1 className="font-bold text-2xl mb-4">
          시작일과 종료일을 선택해주세요
        </h1>
        <div className="flex w-full justify-center items-center">
          <RangeCalendar
            aria-label="date-range"
            value={{
              start: startDate,
              end: endDate,
            }}
            onChange={(v) => {
              if (v) {
                setStartDate(v.start);
                setEndDate(v.end);
              }
            }}
          />
        </div>
      </div>
      <Button
        fullWidth
        radius="none"
        size="lg"
        color="primary"
        className="mt-auto"
        isLoading={isPending}
        isDisabled={isPending}
        onPress={submit}
      >
        등록하기
      </Button>
    </div>
  );
}
