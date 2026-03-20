'use client';
import { Card, CardBody, CardHeader } from '@heroui/react';

interface Props {
  title: string;
  description: string;
  category: string;
  averageQuota: number;
}

export default function GoalDetailInformation({
  title,
  description,
  category,
  averageQuota,
}: Props) {
  return (
    <Card fullWidth>
      <CardHeader>목표</CardHeader>
      <CardBody>
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex justify-between">
          <span>하루 평균 할당량</span>
          <span className="flex gap-4">
            <span>{averageQuota}</span>
            <span>{category === '책' ? '페이지' : ''}</span>
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
