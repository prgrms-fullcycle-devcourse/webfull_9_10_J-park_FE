'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@heroui/react';
import TodayGoalItem from './TodayGoalItem';
import GoalSubmitModal from './GoalSubmitModal';
import { TodayGoal as GoalType } from '@/types/goal';

import { useTodayGoalController } from '@/hooks/useTodayGoalController';

const GOAL_COLORS = [
  'bg-red-500',
  'bg-orange-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
];

export default function TodayGoalDashboard() {
  const {
    goals,
    isLoading,
    playingId,
    isModalOpen,
    endMutation,
    handlePlayClick,
    closeAndClearModal,
  } = useTodayGoalController();

  const [localGoals, setLocalGoals] = useState<GoalType[]>([]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const playingGoal = localGoals.find((g) => g.id === playingId);

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

  if (isLoading)
    return <div className="p-4 text-center">데이터를 불러오는 중입니다...</div>;

  return (
    <>
      <Card className="w-full p-5 bg-white shadow-md border-none" radius="lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">오늘의 목표</h2>

        <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
          {localGoals.length > 0 ? (
            localGoals.map((goal, index) => (
              <TodayGoalItem
                key={goal.id}
                goal={goal}
                colorClass={GOAL_COLORS[index % GOAL_COLORS.length]}
                isPlaying={playingId === goal.id}
                onPlayClick={handlePlayClick}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 font-medium">
              오늘의 목표가 없습니다.
            </div>
          )}
        </div>
      </Card>

      {playingGoal && (
        <GoalSubmitModal
          isOpen={isModalOpen}
          onClose={closeAndClearModal}
          onSubmit={(amount: number) => endMutation.mutate(amount)}
          targetAmount={playingGoal.targetAmount}
          unit={playingGoal.unit}
          isPending={endMutation.isPending}
          goalTitle={playingGoal.title}
        />
      )}
    </>
  );
}
