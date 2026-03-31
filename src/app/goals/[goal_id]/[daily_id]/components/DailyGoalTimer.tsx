'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTimerStore } from '@/stores/useTimerStore';
import { formatMilliseconds } from '@/lib/utils';
import GoalPlayButton from '@/components/GoalPlayButton';

import {
  startTimer as apiStartTimer,
  endTimer as apiEndTimer,
} from '@/api/timerApi';
import GoalSubmitModal from '../../../../components/GoalSubmitModal';

interface DailyGoalTimerProps {
  goalId: number;
  goalTitle: string;
  quotaText: string;
  initialStudyTime: number;
  targetAmount?: number;
  unit?: string;
}

export default function DailyGoalTimer({
  goalId,
  goalTitle,
  quotaText,
  initialStudyTime,
  targetAmount = 0,
  unit = '',
}: DailyGoalTimerProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    playingId,
    startTime,
    stopTimer: localStopTimer,
    startTimer: localStartTimer,
    recordedTimes,
  } = useTimerStore();

  const baseTime = initialStudyTime + (recordedTimes[goalId] || 0);
  const [liveMs, setLiveMs] = useState(baseTime);
  const isPlaying = playingId === goalId;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && startTime) {
      interval = setInterval(() => {
        setLiveMs(baseTime + (Date.now() - startTime));
      }, 1000);
    } else {
      setLiveMs(baseTime);
    }

    return () => clearInterval(interval);
  }, [isPlaying, startTime, baseTime]);

  const startMutation = useMutation({
    mutationFn: () => apiStartTimer({ goalId }),
    onSuccess: () => {
      localStartTimer(goalId);
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
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
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });

      setIsModalOpen(false);
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
          <GoalPlayButton isPlaying={isPlaying} onClick={handleToggleTimer} />
        </div>
      </div>

      <GoalSubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(amount) => endMutation.mutate(amount)}
        targetAmount={targetAmount}
        unit={unit}
        isPending={endMutation.isPending}
        goalTitle={goalTitle}
      />
    </>
  );
}
