'use client';
import { Page } from '@/components/ui';

import MyInformation from './components/MyInformation';
import MyInformationEdit from './components/MyInformationEdit';
import MyGoals from './components/MyGoals';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { MyProfileResponse, User } from '@/types/user';
import { Skeleton } from '@heroui/react';

export default function MePage() {
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

  return (
    <div className="flex flex-col p-6 gap-4">
      <Page.Title>마이페이지</Page.Title>
      <MyInformation userInfo={{ ...userInfo.data }} />
      <MyInformationEdit userInfo={{ ...userInfo.data }} />
      <MyGoals goals={userInfo.data.goals} />
    </div>
  );
}
