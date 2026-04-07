'use client';

import { Card, CardBody } from '@heroui/react';

import UserRankingInfo from './components/UserRankingInfo';
import UserGoalInfo from './components/UserGoalInfo';

export default function OtherInfoCard() {
  return (
    <Card className="animate-fadeIn">
      <CardBody className="p-0 py-4">
        <UserRankingInfo />
        <UserGoalInfo />
      </CardBody>
    </Card>
  );
}
