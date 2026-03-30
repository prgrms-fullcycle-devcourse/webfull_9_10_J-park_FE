'use client';

import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import GoalDetailInformation from './GoalDetailInformation';
import GoalProgression from './GoalProgression';
import DailyGoalList from './DailyGoalList';
import { GoalDetail, GoalDetailResponse } from '../types';
import GoalDetailInfoSkeleton from './GoalDetailInformation/GoalDetailInfoSkeleton';
import GoalProgressionSkeleton from './GoalProgression/GoalProgressionSkeleton';

interface Props {
  goalID: number;
}

export default function DetailContainer({ goalID }: Props) {
  const { data, isLoading } = useQuery<GoalDetail>({
    queryKey: ['goal', 'detail'],
    queryFn: () =>
      api
        .get<GoalDetailResponse>(`/goals/${goalID}/detail`)
        .then((res) => res.data),
  });
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <GoalDetailInfoSkeleton />
        <GoalProgressionSkeleton />
      </div>
    );
  }
  return (
    <>
      {data && (
        <>
          <GoalDetailInformation
            goalID={goalID}
            title={data.title}
            description={data.description}
            category={data.category}
            totalAmount={data.progress.targetAmount}
            startDate={data.period.startDate}
            endDate={data.period.endDate}
            unit={data.progress.unit}
          />

          <GoalProgression progress={data.progress} period={data.period} />

          <DailyGoalList dailyProgress={data.dailyProgress} />
        </>
      )}
    </>
  );
}
