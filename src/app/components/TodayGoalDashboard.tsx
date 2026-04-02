'use client';

import { Card } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import TodayGoalItem from './TodayGoalItem';

import { TodayGoalResponse } from '@/types/goal';
import { api } from '@/lib/axios';

export default function TodayGoalDashboard() {
  const { data } = useQuery({
    queryKey: ['today', 'goals'],
    queryFn: () =>
      api.get<TodayGoalResponse>('/goals/today').then((res) => res.data),
  });

  if (!data || !data.todayGoals) {
    return;
  }

  const { todayGoals } = data;

  return (
    <Card>
      <div>
        {todayGoals.length > 0 ? (
          todayGoals.map((goal) => <TodayGoalItem key={goal.id} goal={goal} />)
        ) : (
          <div className="p-4 text-center text-gray-500 font-medium">
            오늘의 목표가 없습니다.
          </div>
        )}
      </div>
    </Card>
  );
}
