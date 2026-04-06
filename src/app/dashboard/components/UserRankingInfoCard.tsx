'use client';
import { api } from '@/lib/axios';

import { Ranking, RankingsResponse } from '@/types/user';
import { Button, Card, CardBody, Link } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { FcBarChart } from 'react-icons/fc';
import { IoChevronForwardOutline } from 'react-icons/io5';

export default function UserRankingInfoCard() {
  const { data, isLoading } = useQuery<Ranking>({
    queryKey: ['rankings'],
    queryFn: () =>
      api.get<RankingsResponse>('rankings?limit=1').then((res) => res.data),
  });

  if (!data) {
    return;
  }

  console.log(data);

  return (
    <Card className="animate-fadeIn">
      <CardBody className="p-0">
        <div className="flex gap-4">
          <Button
            as={Link}
            href="/community"
            radius="none"
            className="px-6 py-4 h-full w-full"
            variant="light"
          >
            <Button
              className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
              isIconOnly
              disableAnimation
              disableRipple
            >
              <FcBarChart size={24} />
            </Button>
            <div className="flex w-full justify-between">
              <div>
                <p className="truncate font-black text-xl -mb-2">
                  {data.myRanking.myRanking}위
                </p>
                <small className="text-gray-600">현재 순위</small>
              </div>
            </div>
            <Button
              radius="full"
              className="ml-auto p-0"
              isIconOnly
              disableAnimation
              disableRipple
              variant="light"
            >
              <IoChevronForwardOutline size={20} />
            </Button>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
