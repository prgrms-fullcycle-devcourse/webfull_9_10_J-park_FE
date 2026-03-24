'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@heroui/react';
import { useTimerStore } from '@/stores/useTimerStore';
import TodayGoalItem from './TodayGoalItem';

const DUMMY_GOALS = [
  {
    id: 1,
    title: '목표 1',
    studyTime: 900000,
    currentAmount: 10,
    targetAmount: 10,
    unit: '페이지',
    completed: true,
  },
  {
    id: 2,
    title: '목표 2',
    studyTime: 3600000,
    currentAmount: 12,
    targetAmount: 10,
    unit: '페이지',
    completed: true,
  },
  {
    id: 3,
    title: '목표 3',
    studyTime: 1800000,
    currentAmount: 2,
    targetAmount: 10,
    unit: '페이지',
    completed: false,
  },
];

const GOAL_COLORS = [
  'bg-red-500',
  'bg-orange-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
];

export default function TodayGoalDashboard() {
  const router = useRouter();
  const [goals, setGoals] = useState(DUMMY_GOALS);
  const { playingId, startTimer } = useTimerStore();

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handlePlayClick = (e: React.MouseEvent, goalId: number) => {
    e.preventDefault();
    e.stopPropagation();
    startTimer(goalId);
    router.push(`/goals/${goalId}/daily-1`);
  };

  const handleDragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
  };
  const handleDragEnter = (e: React.DragEvent, position: number) => {
    dragOverItem.current = position;
  };
  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newGoals = [...goals];
      const draggingItemContent = newGoals[dragItem.current];
      newGoals.splice(dragItem.current, 1);
      newGoals.splice(dragOverItem.current, 0, draggingItemContent);
      setGoals(newGoals);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <Card className="w-full p-5 bg-white shadow-md border-none" radius="lg">
      <h2 className="text-lg font-bold mb-4 text-gray-800">오늘의 목표</h2>

      <div className="flex flex-col rounded-md border border-gray-200 overflow-hidden">
        {goals.map((goal, index) => {
          // 💡 2. 길었던 코드가 부품 하나로 아주 깔끔하게 정리되었습니다!
          return (
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
          );
        })}
      </div>
    </Card>
  );
}
