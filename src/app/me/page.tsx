'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { MyProfileResponse, User } from '@/types/user';
import {
  addToast,
  Button,
  Input,
  Link,
  Skeleton,
  useDisclosure,
} from '@heroui/react';
import { FcSurvey } from 'react-icons/fc';
import { FcClock } from 'react-icons/fc';
import { MdModeEdit } from 'react-icons/md';
import IconCropperModal from '@/components/modals/ProfileImageCropModal';
import { useCallback, useRef, useState } from 'react';
import MyInformationEdit from './components/MyInformationEdit';

const DEFAULT_PROFILE_IMG_URL = 'https://picsum.photos/id/237/200/300';
export default function MePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userInfo = useQuery<User>({
    queryKey: ['users', 'me'],
    queryFn: () =>
      api.get<MyProfileResponse>('/users/me').then((res) => res.data),
  });

  if (userInfo.isLoading && !userInfo.isFetched) {
    return (
      <div className="flex flex-col p-6 gap-4">
        <Skeleton className="w-32 h-12 rounded-2xl" />
        <Skeleton className="w-full h-80 rounded-2xl" />
        <Skeleton className="w-full h-12 rounded-2xl" />
        <Skeleton className="w-full h-80 rounded-2xl" />
      </div>
    );
  }
  if (!userInfo.data || userInfo.isError) {
    return;
  }

  const { nickname, createdAt, totalTime, goals } = userInfo.data;

  return (
    <div
      className="relative flex flex-col gap-4 bg-slate-200 overflow-auto scrollbar-hide min-h-full max-h-full"
      style={{
        backgroundImage: `url(${DEFAULT_PROFILE_IMG_URL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        className="absolute top-6 right-6 bg-slate-300 shadow-md"
        onPress={onOpen}
      >
        <MdModeEdit className="text-white" size={24} />
      </Button>
      <div className="mt-80 rounded-t-2xl w-full min-h-dvh bg-white z-20">
        <MyInformationEdit userInfo={{ ...userInfo.data }} />
        <div className="flex bg-white mb-4 items-center gap-4 p-6 pt-0">
          <Button
            radius="full"
            className="p-0 hover:cursor-default"
            isIconOnly
            disableAnimation
            disableRipple
          >
            <FcClock size={24} />
          </Button>
          <div>
            <small className="text-gray-600">지금까지 진행한 총 시간</small>
            <p className="font-black text-xl">
              {totalTime.toLocaleString()} 시간
            </p>
          </div>
        </div>
        <div className="bg-white py-6">
          <div className="text-sm text-gray-600 mb-4 mx-6">
            오늘해야 할 목표들
          </div>
          {goals.map((goal) => (
            <Button
              key={goal.id}
              as={Link}
              href={`goals/${goal.id}`}
              variant="light"
              radius="none"
              className="w-full h-full flex items-center gap-4 shrink-0 px-6 py-4"
            >
              <Button
                radius="full"
                className="p-0 hover:cursor-default bg-primary"
                isIconOnly
                disableAnimation
                disableRipple
              >
                <FcSurvey size={24} />
              </Button>
              <div className="flex w-full justify-between">
                <div>
                  <p className="truncate font-black text-xl -mb-2">
                    {goal.title}
                  </p>
                  <small className="text-gray-600">번호 {goal.id}</small>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl -mb-2">{goal.todayQuota}</p>
                  <small className="text-gray-600">할당량</small>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <IconCropperModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={(blob, url) => {
          addToast({
            title: '프로필 이미지 변경합니다',
            description: '이 기능은 추후 업데이트됩니다',
            color: 'warning',
          });
        }}
      />
    </div>
  );
}
