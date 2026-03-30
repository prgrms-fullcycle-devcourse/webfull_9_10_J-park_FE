'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@heroui/react';
import { useTimerStore } from '@/stores/useTimerStore';
import TodayGoalItem from './TodayGoalItem';
import { TodayGoal as GoalType } from '@/types/goal';

import { startTimer as apiStartTimer } from '@/api/timerApi';

const GOAL_COLORS = [
  'bg-red-500',
  'bg-orange-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
];

interface Props {
  goals: GoalType[];
}

export default function TodayGoalDashboard({ goals }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { playingId, startTimer: localStartTimer } = useTimerStore();

  const [localGoals, setLocalGoals] = useState<GoalType[]>(goals);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const startMutation = useMutation({
    mutationFn: (variables: { goalId: number; dailyId: number }) =>
      apiStartTimer({ goalId: variables.goalId }),
    onSuccess: (_, variables) => {
      localStartTimer(variables.goalId);
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
      router.push(`/goals/${variables.goalId}/${variables.dailyId}`);
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
      router.push(`/goals/${goalId}/${dailyId}`);
    } else {
      startMutation.mutate({ goalId, dailyId });
    }
  };

  const handleDragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
  };
  const handleDragEnter = (e: React.DragEvent, position: number) => {
    dragOverItem.current = position;
  };
  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newGoals = [...localGoals];
      const draggingItemContent = newGoals[dragItem.current];

      newGoals.splice(dragItem.current, 1);
      newGoals.splice(dragOverItem.current, 0, draggingItemContent);

      setLocalGoals(newGoals);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <Card className="w-full p-5 bg-white shadow-md border-none" radius="lg">
      <h2 className="text-lg font-bold mb-4 text-gray-800">오늘의 목표</h2>

      <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
        {localGoals.length > 0 ? (
          localGoals.map((goal, index) => {
            return (
              <TodayGoalItem
                key={goal.id}
                goal={goal}
                colorClass={GOAL_COLORS[index % GOAL_COLORS.length]}
                isPlaying={playingId === goal.id}
                onPlayClick={(e) => handlePlayClick(e, goal.id, goal.dailyId)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
              />
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500 font-medium">
            오늘의 목표가 없습니다.
          </div>
        )}
      </div>
    </Card>
  );
}
