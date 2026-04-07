'use client';

import { Card } from '@heroui/react';

import UserRankingInfo from './components/UserRankingInfo';
import UserGoalInfo from './components/UserGoalInfo';

export default function OtherInfoCard() {
  return (
    <Card className="animate-fadeIn">
      <UserRankingInfo />
      <UserGoalInfo />
    </Card>
  );
}
