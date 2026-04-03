'use client';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface StudyProgressProps {
  percentage?: number;
}

const STROKE_WIDTH = 16;
const PATH_RADIUS = 50 - STROKE_WIDTH / 2;
const PROGRESS_COLOR = {
  success: 'oklch(87.1% 0.15 154.449)',
  warn: 'oklch(83.7% 0.128 66.29)',
  danger: 'oklch(70.4% 0.191 22.216)',
};

function getPositionOnCircle(percentage: number) {
  const angle = (percentage / 100) * 360 - 90;
  const radian = (angle * Math.PI) / 180;
  const x = 50 + PATH_RADIUS * Math.cos(radian);
  const y = 50 + PATH_RADIUS * Math.sin(radian);
  return { x, y };
}

function getProgressColor(percentage: number) {
  if (percentage >= 70) {
    return 'success';
  } else if (percentage < 70 || percentage >= 30) {
    return 'warn';
  } else {
    return 'danger';
  }
}

export default function StudyProgress({ percentage = 0 }: StudyProgressProps) {
  const startPos = getPositionOnCircle(0);
  const endPos = getPositionOnCircle(percentage);

  // 아이콘 크기 = strokeWidth와 동일하게 맞춤
  const iconSize = `${STROKE_WIDTH * 0.8}%`;

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
          className="font-pretendard font-bold text-2xl"
          style={{
            color: PROGRESS_COLOR[getProgressColor(percentage)],
          }}
        >
          {percentage}%
        </span>
      </CircularProgressbarWithChildren>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md flex items-center justify-center border-2 border-gray-200/75"
        style={{
          left: `${startPos.x}%`,
          top: `${startPos.y}%`,
          width: iconSize,
          height: iconSize,
        }}
      >
        <span style={{ fontSize: '60%' }}>⏱️</span>
      </div>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md flex items-center justify-center border-2 border-gray-200/75"
        style={{
          left: `${endPos.x}%`,
          top: `${endPos.y}%`,
          width: iconSize,
          height: iconSize,
        }}
      >
        <span style={{ fontSize: '60%' }}>✏️</span>
      </div>
    </div>
  );
}
