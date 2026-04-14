'use client';
import { api } from '@/lib/axios';
import { Goal, GoalsResponse } from '@/types/api';

import { Button } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FcInspection } from 'react-icons/fc';

import { IoChevronForwardOutline } from 'react-icons/io5';

export default function UserGoalInfo() {
  const { data, isError, isLoading } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: () =>
      api.get<GoalsResponse>('goals').then((res) => res.data.goals),
  });

  if (!data || isError || isLoading) {
    return;
  }

  return (
    <div className="flex gap-4 pb-4">
      <Link
        href="/goals"
        className="flex items-center gap-2 px-6 py-2 h-full w-full"
      >
        <Button
          className="rounded-2xl p-0 hover:cursor-default bg-gray-100"
          isIconOnly
          disableAnimation
          disableRipple
        >
          <FcInspection size={24} />
        </Button>
        <div className="flex w-full justify-between">
          <div>
            <p className="truncate font-black text-xl -mb-2">{data.length}개</p>
            <small className="text-gray-600">내가 등록한 목표들</small>
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
      </Link>
    </div>
  );
}
