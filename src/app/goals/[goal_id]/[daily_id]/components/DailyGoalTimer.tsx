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
import StudyProgress from './StudyProgress';

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
      queryClient.invalidateQueries({ queryKey: ['goals', 'timer'] });
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
    },
    onError: (error: any) => {
      const isAlreadyRunning =
        error.response?.status === 409 ||
        error.response?.data?.error?.code === 'ALREADY_RUNNING';

      if (isAlreadyRunning) {
        queryClient.invalidateQueries({ queryKey: ['goals', 'timer'] });
        queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
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

      queryClient.invalidateQueries({ queryKey: ['goals', 'timer'] });
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });

      setIsModalOpen(false);
      router.push('/');
    },
    onError: (error: any) => {
      console.error('타이머 종료 실패 (상태 강제 동기화 진행)');

      localStopTimer();
      clearRecordedTime(goalId);
      setIsModalOpen(false);

      queryClient.invalidateQueries({ queryKey: ['goals', 'timer'] });
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });

      router.push('/');
    },
  });

  const percentage = Math.max(
    Math.round((currentTotalAmount / totalTargetAmount) * 100),
  );

  const [hours, minutes, seconds] = formatMilliseconds(liveMs).split(':');
  return (
    <>
      <div className="animate-fadeIn sticky top-0 flex flex-col items-center justify-center mb-6">
        <div className="flex w-full justify-between p-6">
          <p className="text-2xl font-bold">{goalTitle}</p>
          <p className="text-2xl font-bold">no.{goalId}</p>
        </div>
        <div className="flex flex-col items-center justify-center mb-6">
          <StudyProgress percentage={percentage || 0} />
          <div className="min-w-30 min-h-4 mt-4 bg-gray-200 rounded-[50%] blur-xs" />
        </div>
        <div className="flex flex-col justify-center w-full text-center text-gray-600">
          <small className="text-gray-600">누적 공부 시간</small>
          <div className="flex font-pretendard items-center justify-center font-bold text-4xl">
            <span className="flex flex-col w-1/4">
              <div>{hours}</div>
              <small className="text-xs text-gray-200">hours</small>
            </span>
            <span className="text-gray-100 text-2xl font-light">|</span>
            <span className="flex flex-col w-1/4">
              <div>{minutes}</div>
              <small className="text-xs text-gray-200">minutes</small>
            </span>
            <span className="text-gray-100 text-2xl font-light">|</span>
            <span className="flex flex-col w-1/4">
              <div>{seconds}</div>
              <small className="text-xs text-gray-200">seconds</small>
            </span>
          </div>
        </div>
      </div>
      <GoalSubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(amount) => endMutation.mutateAsync(amount)}
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
