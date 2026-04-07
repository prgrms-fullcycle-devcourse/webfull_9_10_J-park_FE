'use client';

import { fetchTodayProgress } from '@/api/goalApi';
import { useQuery } from '@tanstack/react-query';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const STROKE_WIDTH = 16;
const PROGRESS_COLOR = {
  success: 'oklch(87.1% 0.15 154.449)',
  warn: 'oklch(83.7% 0.128 66.29)',
  danger: 'oklch(70.4% 0.191 22.216)',
};

function getProgressColor(percentage: number) {
  if (percentage >= 70) {
    return 'success';
  } else if (percentage < 70 && percentage >= 30) {
    return 'warn';
  } else {
    return 'danger';
  }
}

export default function TotalProgression() {
  const { data: progressData } = useQuery({
    queryKey: ['todayProgress'],
    queryFn: fetchTodayProgress,
  });

  if (!progressData) {
    return;
  }

  const { totalTime, completedGoals, ratio, totalGoals } = progressData.data;

  const percentage = (completedGoals / totalGoals) * 100;

  return (
    <div className="relative w-40 h-40 z-10">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={STROKE_WIDTH}
        styles={buildStyles({
          pathColor: PROGRESS_COLOR[getProgressColor(percentage)],
          trailColor: 'oklch(92.9% 0.013 255.508)',
          rotation: 0,
          strokeLinecap: 'round',
          pathTransitionDuration: 0.5,
        })}
      >
        <span
          className="font-bold text-2xl"
          style={{
            color: PROGRESS_COLOR[getProgressColor(percentage)],
          }}
        >
          <div className="font-pretendard text-2xl">
            {completedGoals}/{totalGoals}
          </div>
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
}
