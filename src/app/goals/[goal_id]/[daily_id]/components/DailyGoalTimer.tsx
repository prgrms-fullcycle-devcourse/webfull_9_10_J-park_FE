'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTimerStore } from '@/stores/useTimerStore';
import { formatMilliseconds } from '@/lib/utils';
import GoalPlayButton from '@/components/GoalPlayButton';
import { useSyncedTime } from '@/hooks/useSyncedTime';

import {
  startTimer as apiStartTimer,
  endTimer as apiEndTimer,
} from '@/api/timerApi';
import GoalSubmitModal from '@/app/components/GoalSubmitModal';

interface DailyGoalTimerProps {
  goalId: number;
  goalTitle: string;
  quotaText: string;
  initialStudyTime: number;
  targetAmount?: number;
  unit?: string;
  totalTargetAmount: number;
  currentTotalAmount: number;
}

export default function DailyGoalTimer({
  goalId,
  goalTitle,
  quotaText,
  initialStudyTime,
  targetAmount = 0,
  unit = '',
  totalTargetAmount,
  currentTotalAmount,
}: DailyGoalTimerProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    playingId,
    startTime,
    stopTimer: localStopTimer,
    startTimer: localStartTimer,
    recordedTimes,
    clearRecordedTime,
  } = useTimerStore();

  const currentGlobalTime = useSyncedTime();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseTime = initialStudyTime + (recordedTimes[goalId] || 0);
  const isPlaying = playingId === goalId;

  const liveMs =
    isPlaying && startTime
      ? baseTime + (currentGlobalTime - startTime)
      : baseTime;

  const startMutation = useMutation({
    mutationFn: () => apiStartTimer({ goalId }),
    onMutate: () => {
      localStartTimer(goalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
    },
    onError: (error: any) => {
      const isAlreadyRunning =
        error.response?.status === 409 ||
        error.response?.data?.error?.code === 'ALREADY_RUNNING';

      if (isAlreadyRunning) {
        queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
        queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
        queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
      } else {
        localStopTimer();
        alert('네트워크 오류로 타이머를 시작하지 못했습니다.');
      }
    },
  });

  const endMutation = useMutation({
    mutationFn: (amount: number) =>
      apiEndTimer({
        goalId,
        currentCompletedAmount: amount,
        isPaused: false,
      }),
    onSuccess: () => {
      localStopTimer();
      clearRecordedTime(goalId);

      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });

      setIsModalOpen(false);
      router.push('/');
    },
    onError: (error: any) => {
      console.error('타이머 종료 실패 (상태 강제 동기화 진행)');

      localStopTimer();
      clearRecordedTime(goalId);
      setIsModalOpen(false);

      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });

      router.push('/');
    },
  });

  const handleToggleTimer = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (startMutation.isPending || endMutation.isPending) return;

    if (isPlaying) {
      setIsModalOpen(true);
    } else {
      startMutation.mutate();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-white">{goalTitle}</span>
          <span className="text-xl font-bold text-white">
            {targetAmount} {unit}
          </span>
        </div>

        <div className="text-3xl font-bold text-white tracking-wider">
          {formatMilliseconds(liveMs)}
        </div>

        <div
          className={`ml-4 scale-125 origin-right ${
            startMutation.isPending || endMutation.isPending ? 'opacity-50' : ''
          }`}
        >
          <GoalPlayButton
            isPlaying={isPlaying && !isModalOpen}
            onClick={handleToggleTimer}
          />
        </div>
      </div>

      <GoalSubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(amount) => endMutation.mutate(amount)}
        totalTargetAmount={totalTargetAmount}
        dailyTargetAmount={targetAmount}
        currentAmount={currentTotalAmount}
        unit={unit}
        isPending={endMutation.isPending}
        goalTitle={goalTitle}
      />
    </>
  );
}
