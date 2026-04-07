'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardBody } from '@heroui/react';

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
  '이 페이스라면 지금은 괜찮지만, 방심하면 목표에서 멀어질 수 있습니다.',
  '지금 속도로는 목표 달성이 어려울 수 있습니다. 지금 조정이 필요합니다.',
  '이 상태가 계속되면 목표 달성은 힘들어집니다. 지금 바로 페이스를 끌어올려야 합니다!',
];

export default function PaceIndicatorCard() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['paceRisk'],
    queryFn: fetchRiskData,
  });

  if (isError || !data?.data) {
    return;
  }

  if (isLoading) {
    return;
  }

  const { level } = data.data;

  return (
    <Card className="animate-fadeIn">
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
