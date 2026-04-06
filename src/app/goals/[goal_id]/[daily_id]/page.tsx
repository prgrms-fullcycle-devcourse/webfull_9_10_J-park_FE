'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DailyGoalTimer from './components/DailyGoalTimer';
import DailyGoalList from './components/DailyGoalList';
import { fetchTodayGoals, fetchGoalDetail } from '@/api/goalApi';
import { IoPlay, IoStop } from 'react-icons/io5';
import { Button, Card } from '@heroui/react';
import GoalSubmitModal from '@/app/components/GoalSubmitModal';
import {
  startTimer as apiStartTimer,
  endTimer as apiEndTimer,
} from '@/api/timerApi';
import { useParams, useRouter } from 'next/navigation';
import { useTimerStore } from '@/stores/useTimerStore';

export default function DailyGoalDetailPage() {
  const { goal_id, daily_id } = useParams();
  const dailyId = Number(daily_id) || null;
  const goalId = Number(goal_id);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    playingId,
    stopTimer: localStopTimer,
    startTimer: localStartTimer,
    clearRecordedTime,
  } = useTimerStore();

  const { data: goalData, isError } = useQuery({
    queryKey: ['todayGoals'],
    queryFn: fetchTodayGoals,
  });

  const { data: detailData } = useQuery({
    queryKey: ['goalDetail', goalId],
    queryFn: () => fetchGoalDetail(goalId),
    enabled: !!goalId,
  });

  const isPlaying = playingId === goalId;

  const startMutation = useMutation({
    mutationFn: () => apiStartTimer({ goalId }),
    onMutate: () => {
      localStartTimer(goalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });
    },
    onError: (error: any) => {
      const isAlreadyRunning =
        error.response?.status === 409 ||
        error.response?.data?.error?.code === 'ALREADY_RUNNING';

      if (isAlreadyRunning) {
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

      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      queryClient.invalidateQueries({ queryKey: ['todayProgress'] });

      router.push('/');
    },
  });

  const handleToggleTimer = () => {
    if (startMutation.isPending || endMutation.isPending) return;

    if (isPlaying) {
      setIsModalOpen(true);
    } else {
      startMutation.mutate();
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2a2a2a] text-red-500 font-bold">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }
  if (!goalData) {
    return;
  }
  const totalTargetAmount = detailData?.data?.progress?.targetAmount || 0;
  const currentTotalAmount = detailData?.data?.progress?.currentAmount || 0;

  const todayGoals = goalData?.data?.todayGoals || [];
  const currentGoal =
    todayGoals.find(
      (g: { id: number; [key: string]: any }) => g.id === goalId,
    ) || todayGoals[0];

  return (
    <>
      <div className="relative flex flex-col bg-slate-50 overflow-auto scrollbar-hide max-h-screen">
        <DailyGoalTimer
          goalId={currentGoal?.id || 0}
          goalTitle={currentGoal?.title || '목표 없음'}
          quotaText="할당량"
          initialStudyTime={currentGoal?.studyTime || 0}
          targetAmount={currentGoal?.targetAmount || 0}
          unit={currentGoal?.unit || ''}
          totalTargetAmount={currentGoal?.targetAmount || 0}
          currentTotalAmount={currentGoal?.currentAmount || 0}
        />
        <div className="animate-fadeIn w-full rounded-t-2xl bg-white min-h-screen z-30">
          <Card className="relative m-4">
            {dailyId !== null ? (
              <Button
                color={isPlaying ? 'danger' : 'primary'}
                variant="flat"
                startContent={isPlaying ? <IoStop /> : <IoPlay />}
                onPress={handleToggleTimer}
              >
                {isPlaying ? '정지' : '시작'}
              </Button>
            ) : (
              <Button color="warning" variant="flat" isDisabled={true}>
                오늘 진행할 수 있는 데일리 목표가 아닙니다
              </Button>
            )}
          </Card>

          {todayGoals.length > 0 && <DailyGoalList goals={todayGoals} />}
        </div>
      </div>
      <GoalSubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(amount) => endMutation.mutate(amount)}
        totalTargetAmount={totalTargetAmount}
        dailyTargetAmount={currentGoal.targetAmount}
        currentAmount={currentTotalAmount}
        unit={currentGoal.unit}
        isPending={endMutation.isPending}
        goalTitle={currentGoal.title}
      />
    </>
  );
}
