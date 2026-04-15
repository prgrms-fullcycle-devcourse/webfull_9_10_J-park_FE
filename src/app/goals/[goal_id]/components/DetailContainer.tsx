'use client';

import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import GoalDetailInformation from './GoalDetailInformation';
import GoalProgression from './GoalProgression';
import DailyGoalList from './DailyGoalList';
import { GoalDetail, GoalDetailResponse } from '../types';
import { Button } from '@heroui/react';
import { FcSurvey } from 'react-icons/fc';

interface Props {
  goalID: number;
}

export default function DetailContainer({ goalID }: Props) {
  const { data } = useQuery<GoalDetail>({
    queryKey: ['goal', 'detail'],
    queryFn: () =>
      api
        .get<GoalDetailResponse>(`/goals/${goalID}/detail`)
        .then((res) => res.data),
  });

  return (
    <div className="relative flex flex-col overflow-auto scrollbar-hide max-h-screen bg-slate-50">
      <div
        className="sticky top-0 flex flex-col gap-4"
        style={{
          backgroundImage: 'url("/bg-goal.png")',
          backgroundSize: '110% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: '-200px',
          backgroundPositionX: '-10px',
        }}
      >
        <div className="w-full h-full flex flex-col backdrop-blur-sm">
          <Button
            radius="full"
            className="w-16 h-16 mx-6 my-2 mt-6  hover:cursor-default bg-primary"
            isIconOnly
            disableAnimation
            disableRipple
          >
            <FcSurvey size={48} className="shrink-0" />
          </Button>
          <div className=" mx-6 my-2 mb-6 ">
            <small className='"text-gray-600"'>{data?.description}</small>
            <p className="font-black text-2xl">{data?.title}</p>
          </div>
        </div>
      </div>
      {data && (
        <div className="animate-fadeIn flex flex-col gap-4 rounded-t-2xl w-full min-h-dvh h-full bg-white z-20 -mt-4">
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

          <DailyGoalList goalID={goalID} dailyProgress={data.dailyProgress} />
        </div>
      )}
    </div>
  );
}
