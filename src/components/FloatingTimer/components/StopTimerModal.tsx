'use client';

import { api } from '@/lib/axios';
import { EndTimer, EndTimerResponse } from '@/types/timer';
import { addToast, Button } from '@heroui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useTimerStore } from '@/stores/useTimerStore';
import { fetchGoalDetail, fetchTodayGoals } from '@/api/goalApi';
import GoalSubmitModal from '@/app/components/GoalSubmitModal';

interface Props {
  goalID: number;
  targetAmount: number;
}

export default function StopTimerModal({ goalID, targetAmount }: Props) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const { stopTimer } = useTimerStore();

  const { data: detailData } = useQuery({
    queryKey: ['goalDetail', goalID],
    queryFn: () => fetchGoalDetail(goalID),
    enabled: !!goalID,
  });

  const { data: goalData } = useQuery({
    queryKey: ['todayGoals'],
    queryFn: fetchTodayGoals,
  });

  const handleOpenSync = async () => {
    setIsRefetching(true);
    try {
      await queryClient.refetchQueries({ queryKey: ['goals', 'timer'] });
      await queryClient.refetchQueries({ queryKey: ['todayGoals'] });
      await queryClient.refetchQueries({ queryKey: ['goalDetail', goalID] });
      setIsOpen(true);
    } catch {
      setIsOpen(true);
    } finally {
      setIsRefetching(false);
    }
  };

  const { mutateAsync, isPending } = useMutation<
    EndTimer,
    Error,
    { goalId: number; currentCompletedAmount: number }
  >({
    mutationFn: (params) =>
      api
        .post<EndTimerResponse>('/timers/end', { ...params, isPaused: false })
        .then((res) => res.data as unknown as EndTimer),
    onSuccess: (data) => {
      stopTimer();

      addToast({
        title: '공부를 종료합니다',
        description: `총 ${data.goalProgressRate}%만큼 진행하셨습니다.`,
        color: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['goals', 'timer'] });
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
      queryClient.invalidateQueries({ queryKey: ['goalDetail', goalID] });

      setIsOpen(false);
    },
    onError: (error) => {
      stopTimer();
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
      queryClient.invalidateQueries({ queryKey: ['goalDetail', goalID] });
      setIsOpen(false);
    },
  });

  const currentGoal = goalData?.data?.todayGoals?.find(
    (g: { id: number; [key: string]: any }) => g.id === Number(goalID),
  );

  const goalTitle =
    detailData?.data?.title || currentGoal?.title || '목표 없음';
  const unit = currentGoal?.unit || detailData?.data?.unit || '';
  const safeDailyAmount = currentGoal?.currentAmount || 0;

  const totalTargetAmount = detailData?.data?.progress?.targetAmount || 0;
  const currentTotalAmount = detailData?.data?.progress?.currentAmount || 0;

  const previousAccumulatedAmount = currentTotalAmount - safeDailyAmount;

  return (
    <>
      <Button
        onPress={handleOpenSync}
        isLoading={isRefetching}
        className="shrink-0"
        radius="full"
        color="danger"
      >
        종료
      </Button>

      <GoalSubmitModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={async (amount) => {
          const finalAmount = previousAccumulatedAmount + amount;
          await mutateAsync({
            goalId: Number(goalID),
            currentCompletedAmount: finalAmount,
          });
        }}
        totalTargetAmount={totalTargetAmount}
        dailyTargetAmount={targetAmount}
        currentAmount={safeDailyAmount}
        unit={unit}
        isPending={isPending}
        goalTitle={goalTitle}
      />
    </>
  );
}
