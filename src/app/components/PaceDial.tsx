'use client';

import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';
import dynamic from 'next/dynamic';

const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
  loading: () => <Spinner color="warning" size="lg" />,
});

const PACE_LEVEL_INFO: Record<
  number,
  { text: string; icon: string; color: string }
> = {
  0: { text: '아주 양호', icon: '🟢', color: '#52c41a' },
  1: { text: '양호', icon: '🟢', color: '#52c41a' },
  2: { text: '주의', icon: '🟡', color: '#fadb14' },
  3: { text: '위험', icon: '🔴', color: '#ff4d4f' },
};

const fetchRiskData = async () => {
  return {
    success: true,
    data: {
      score: 80,
      level: 3,
    },
  };
};

export default function PaceDial() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['paceRisk'],
    queryFn: fetchRiskData,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full bg-white p-6 rounded-lg shadow-sm mb-4 h-48">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center w-full bg-white p-6 rounded-lg shadow-sm mb-4 h-48">
        <span className="text-red-500 font-bold">
          페이스 정보를 불러올 수 없습니다.
        </span>
      </div>
    );
  }

  const { score, level } = data.data;
  const currentPace = PACE_LEVEL_INFO[level] || PACE_LEVEL_INFO[0];

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white p-5 rounded-lg shadow-sm mb-4 gap-4">
      <h1 className="text-lg font-bold text-black mb-2 self-start w-full text-left pl-1">
        목표 진행 속도
      </h1>

      <div className="w-full max-w-[320px]">
        <GaugeComponent
          type="semicircle"
          arc={{
            colorArray: ['#52c41a', '#fadb14', '#ff4d4f'],
            padding: 0.02,
            width: 0.5,
          }}
          pointer={{
            type: 'needle',
            color: '#333333',
            length: 0.8,
            width: 15,
            elastic: true,
          }}
          labels={{
            valueLabel: {
              formatTextValue: () => '',
              style: { display: 'none' },
            },
            tickLabels: {
              type: 'outer',
              hideMinMax: true,
            },
          }}
          value={score}
          minValue={0}
          maxValue={100}
        />
      </div>

      <h2 className="text-base font-bold text-black mt-1">
        현재 페이스는 <span className="text-xl">{currentPace.icon}</span>{' '}
        <span
          style={{ color: currentPace.color }}
          className="text-xl font-extrabold"
        >
          {currentPace.text}
        </span>{' '}
        입니다.
      </h2>
    </div>
  );
}
