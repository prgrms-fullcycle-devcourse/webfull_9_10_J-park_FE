'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTimerStore } from '@/stores/useTimerStore';
import { formatMilliseconds } from '@/lib/utils';
import GoalPlayButton from '@/components/GoalPlayButton';

import {
  startTimer as apiStartTimer,
  endTimer as apiEndTimer,
} from '@/api/timerApi';

interface DailyGoalTimerProps {
  goalId: number;
  goalTitle: string;
  quotaText: string;
  initialStudyTime: number;
}

export default function DailyGoalTimer({
  goalId,
  goalTitle,
  quotaText,
  initialStudyTime,
}: DailyGoalTimerProps) {
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
    },
  });

  const endMutation = useMutation({
    mutationFn: () =>
      apiEndTimer({ goalId, currentCompletedAmount: 0, isPaused: true }),
    onSuccess: () => {
      localStopTimer();
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['runningTimer', goalId] });
    },
  });

  const handleToggleTimer = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (startMutation.isPending || endMutation.isPending) return; // 통신 중 중복 클릭 방지

    if (isPlaying) {
      endMutation.mutate();
    } else {
      startMutation.mutate();
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold text-white">{goalTitle}</span>
        <span className="text-xl font-bold text-white">{quotaText}</span>
      </div>

      <div className="text-3xl font-bold text-white tracking-wider">
        {formatMilliseconds(liveMs)}
      </div>

      <div className="ml-4 scale-125 origin-right">
        <GoalPlayButton isPlaying={isPlaying} onClick={handleToggleTimer} />
      </div>
    </div>
  );
}
