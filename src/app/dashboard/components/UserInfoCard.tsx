import { api } from '@/lib/axios';
import { MyProfileResponse, User } from '@/types/user';
import { Button, Card, CardBody } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { FcApproval } from 'react-icons/fc';

export default function UserInfoCard() {
  const userInfo = useQuery<User>({
    queryKey: ['users', 'me'],
    queryFn: () =>
      api.get<MyProfileResponse>('/users/me').then((res) => res.data),
  });

  if (!userInfo.data) {
    return;
  }
  const { nickname, createdAt } = userInfo.data;

  return (
    <Card>
      <Button
        isIconOnly
        variant="light"
        className="flex w-full h-full justify-between px-6 py-4"
      >
        <Button
          className="rounded-2xl p-0 hover:cursor-default bg-gray-100 mr-4"
          isIconOnly
          disableAnimation
          disableRipple
        >
          <FcApproval size={24} />
        </Button>
        <div className="w-full text-left">
          <small className="text-sm">내 정보 확인하기</small>
          <p className="font-black text-xl -mb-2">{nickname}</p>
          <small className="text-gray-600">{createdAt}</small>
        </div>
      </Button>
    </Card>
  );
}
