'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { MyProfileResponse, User } from '@/types/user';
import { addToast, Button, useDisclosure } from '@heroui/react';
import { FcSurvey, FcClock } from 'react-icons/fc';
import { MdModeEdit } from 'react-icons/md';
import IconCropperModal from '@/components/modals/ProfileImageCropModal';
import MyInformationEdit from './components/MyInformationEdit';
import KakaoLoginCard from './components/KakaoLoginCard';
import { formatStudyTime } from '@/lib/utils';
import Link from 'next/link';
import NavbarFiller from '@/components/ui/NavbarFiller';

const DEFAULT_PROFILE_IMG_URL = 'https://picsum.photos/id/237/200/300';

export default function MePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const qc = useQueryClient();
  const userInfo = useQuery<User>({
    queryKey: ['users', 'me'],
    queryFn: () =>
      api.get<MyProfileResponse>('/users/me').then((res) => res.data),
  });

  const profileMutation = useMutation({
    mutationFn: (params: { formData: FormData }) =>
      api.patch('/users/profile', params.formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      addToast({
        title: '프로필 이미지 변경되었습니다',
        description: '성공적으로 이미지가 업데이트 되었습니다',
        color: 'success',
      });
      qc.invalidateQueries({ queryKey: ['users', 'me'] });
    },
    onError: () => {
      addToast({
        title: '프로필 이미지 변경하지 못했습니다',
        description: '변경중 오류가 발생했습니다',
        color: 'danger',
      });
    },
  });

  if (!userInfo.data || userInfo.isError) {
    return null;
  }

  const { totalTime, goals, loginInfo } = userInfo.data;

  return (
    <div
      className="relative flex flex-col gap-4 bg-white scrollbar-hide"
      style={{
        backgroundImage: `url(${userInfo.data.profileImageUrl || DEFAULT_PROFILE_IMG_URL})`,
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

      <div className="animate-fadeIn mt-80 rounded-t-2xl w-full min-h-full bg-white z-20">
        <MyInformationEdit userInfo={{ ...userInfo.data }} />

        <div className="flex bg-white mb-2 items-center gap-4 px-6 pt-4">
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
              {formatStudyTime(Number(totalTime || 0))}
            </p>
          </div>
        </div>

        <div className="px-6 py-2">
          <KakaoLoginCard
            isLoggedIn={loginInfo?.isLoggedIn}
            email={loginInfo?.email}
          />
        </div>

        <div className="bg-white py-4">
          <div className="text-sm text-gray-600 mb-4 mx-6">
            오늘 해야 할 목표들
          </div>
          {goals.length > 0 &&
            goals.map((goal) => (
              <Link
                key={goal.id}
                href={`goals/${goal.id}`}
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
                    <p className="font-black text-xl -mb-2">
                      {goal.todayQuota}
                    </p>
                    <small className="text-gray-600">할당량</small>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <NavbarFiller />
      <IconCropperModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={(blob) => {
          const formData = new FormData();
          const imageFile = new File([blob], 'user-image.jpg', {
            type: blob.type,
          });
          formData.append('image', imageFile);
          profileMutation.mutate({ formData });
        }}
      />
    </div>
  );
}
