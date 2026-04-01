import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTimerStore } from '@/stores/useTimerStore';
import {
  startTimer as apiStartTimer,
  endTimer as apiEndTimer,
} from '@/api/timerApi';
import { fetchTodayGoals } from '@/api/goalApi';
import { TodayGoal as GoalType } from '@/types/goal';

export const useTodayGoalController = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    playingId,
    startTimer: localStartTimer,
    stopTimer: localStopTimer,
    clearRecordedTime,
  } = useTimerStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingGoal, setPendingGoal] = useState<{
    goalId: number;
    dailyId: number;
  } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['todayGoals'],
    queryFn: fetchTodayGoals,
  });

  const goals: GoalType[] = data?.data?.todayGoals || [];

  const startMutation = useMutation({
    mutationFn: (variables: { goalId: number; dailyId: number }) =>
      apiStartTimer({ goalId: variables.goalId }),
    onSuccess: (_, variables) => {
      localStartTimer(variables.goalId);
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      router.push(`/goals/${variables.goalId}/${variables.dailyId}`);
    },
  });

  const endMutation = useMutation({
    mutationFn: (amount: number) =>
      apiEndTimer({
        goalId: playingId!,
        currentCompletedAmount: amount,
        isPaused: false,
      }),
    onSuccess: () => {
      const stoppedGoalId = playingId;
      localStopTimer();
      if (stoppedGoalId) clearRecordedTime(stoppedGoalId);

      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });

      if (pendingGoal) {
        startMutation.mutate(pendingGoal);
      }
      setIsModalOpen(false);
      setPendingGoal(null);
    },
    onError: (error) => {
      console.error('타이머 종료 실패 (상태 강제 동기화 진행):', error);

      const stoppedGoalId = playingId;
      localStopTimer();
      if (stoppedGoalId) clearRecordedTime(stoppedGoalId);

      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });

      if (pendingGoal) {
        startMutation.mutate(pendingGoal);
      }
      setIsModalOpen(false);
      setPendingGoal(null);
    },
  });

  const handlePlayClick = (
    e: React.MouseEvent,
    goalId: number,
    dailyId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (playingId === goalId) {
      setPendingGoal(null);
      setIsModalOpen(true);
    } else if (playingId && playingId !== goalId) {
      setPendingGoal({ goalId, dailyId });
      setIsModalOpen(true);
    } else {
      startMutation.mutate({ goalId, dailyId });
    }
  };

  const closeAndClearModal = () => {
    setIsModalOpen(false);
    setPendingGoal(null);
  };

  return {
    goals,
    isLoading,
    playingId,
    isModalOpen,
    endMutation,
    handlePlayClick,
    closeAndClearModal,
  };
};
