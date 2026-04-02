'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardBody, Spinner } from '@heroui/react';

import { fetchRiskData } from '@/api/riskApi';
import { FcHighPriority } from 'react-icons/fc';
import { FcMediumPriority } from 'react-icons/fc';
import { FcLowPriority } from 'react-icons/fc';
import { ReactElement } from 'react';

const PACE_LEVEL_INFO: Record<
  number,
  { text: string; icon: ReactElement; color: string }
> = {
  0: {
    text: '안전',
    icon: <FcLowPriority size={80} />,
    color: '#53c41a33',
  },
  1: { text: '주의', icon: <FcMediumPriority size={80} />, color: '#fadb14' },
  2: { text: '위험', icon: <FcHighPriority size={80} />, color: '#ff4d4f' },
};

const PACE_WARNING = [
  '현재 페이스를 유지 한다면 안정적으로 목표를 달설 할 수 있습니다!',
  '현재 페이스가 지속 된다면 목표를 달성하지 못 할 수도 있습니다!',
  '현재 페이스를 개선하지 않으면 목표 달설하기가 힘듭니다!',
];

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

  const { level } = data.data;

  return (
    <Card>
      <CardBody className="p-0">
        <div className="flex items-center p-6 gap-4">
          <div>{PACE_LEVEL_INFO[level].icon}</div>
          <div className="absolute animate-ping">
            {PACE_LEVEL_INFO[level].icon}
          </div>
          <div>
            <p
              className="font-black text-2xl"
              style={{ color: PACE_LEVEL_INFO[level].color }}
            >
              {PACE_LEVEL_INFO[level].text}
            </p>
            <small className="text-gray-600">{PACE_WARNING[level]}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
