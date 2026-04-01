'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import TodayGoalItem from './TodayGoalItem';
import GoalSubmitModal from './GoalSubmitModal';
import { TodayGoal as GoalType } from '@/types/goal';
import { useTodayGoalController } from '@/hooks/useTodayGoalController';
import { fetchGoalDetail } from '@/api/goalApi';

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

  const totalCount = localGoals.length;
  const completedCount = localGoals.filter((g) => g.completed).length;

  const playingGoal = localGoals.find((g) => g.id === playingId);

  const { data: detailData } = useQuery({
    queryKey: ['goalDetail', playingId],
    queryFn: () => fetchGoalDetail(playingId!),
    enabled: isModalOpen && playingId !== null,
  });

  const fetchedTotalAmount = detailData?.data?.progress?.targetAmount || 0;

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">오늘의 목표</h2>
          <span className="text-sm font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
            {completedCount}/{totalCount} 달성!
          </span>
        </div>

        <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
          {localGoals.length > 0 ? (
            localGoals.map((goal, index) => (
              <TodayGoalItem
                key={goal.id}
                goal={goal}
                isPlaying={playingId === goal.id && !isModalOpen}
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
          totalTargetAmount={fetchedTotalAmount}
          dailyTargetAmount={playingGoal.targetAmount}
          currentAmount={playingGoal.currentAmount}
          unit={playingGoal.unit}
          isPending={endMutation.isPending}
          goalTitle={playingGoal.title}
        />
      )}
    </>
  );
}
