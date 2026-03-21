'use client';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Card, Chip } from '@heroui/react';
import GoalPlayButton from './components/GoalPlayButton';
import { formatMilliseconds } from '@/lib/utils';

// =====================================================================
// 더미 데이터 시작
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
// 더미 데이터 끝
// =====================================================================

const GOAL_COLORS = [
  'bg-red-500',
  'bg-orange-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
];

export default function TodayGoalDashboard() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(DUMMY_GOALS);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleGoalClick = (id: number) => {
    navigate(`/daily-detail/${id}`);
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
          const colorClass = GOAL_COLORS[index % GOAL_COLORS.length];

          return (
            <div
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)}
              className="flex w-full bg-white border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex w-full pointer-events-none">
                <div className={`w-3 ${colorClass}`} />

                <div className="flex flex-1 items-center justify-between p-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-gray-800">
                        {goal.title}
                      </span>
                      <span className="text-base font-bold text-gray-800">
                        {formatMilliseconds(goal.studyTime)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      오늘 할당량 ({goal.currentAmount}/{goal.targetAmount}
                      {goal.unit})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pointer-events-auto">
                    <Chip
                      size="sm"
                      color={goal.completed ? 'success' : 'warning'}
                      variant="flat"
                      className="font-bold"
                    >
                      {goal.completed ? '달성' : '미달성'}
                    </Chip>

                    <GoalPlayButton />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
