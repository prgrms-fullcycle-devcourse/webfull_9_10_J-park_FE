'use client';
import { User } from '@/types/user';
import { Button, Card, CardBody, Image } from '@heroui/react';
import { MdModeEdit } from 'react-icons/md';

interface Props {
  userInfo: User;
}

const DEFAULT_PROFILE_IMG_URL = 'https://picsum.photos/id/237/200/300';

export default function MyInformation({ userInfo }: Props) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2 text-center items-center">
          <div className="relative">
            <Image
              isZoomed
              radius="full"
              alt="user profile image"
              src={userInfo.profileImageUrl ?? DEFAULT_PROFILE_IMG_URL}
              width={200}
              height={200}
              shadow="sm"
              className="shrink-0 border-3 border-white"
            />
            <Button
              isIconOnly
              radius="full"
              variant="flat"
              className="absolute bottom-0 right-0 z-30 bg-slate-300 border-3 border-white shadow-md"
            >
              <MdModeEdit className="text-white" size={24} />
            </Button>
          </div>
          <h1 className="font-bold text-4xl mt-4">{userInfo.nickname}</h1>
          <p className="text-slate-400">{userInfo.createdAt}</p>
        </div>
      </CardBody>
    </Card>
  );
}
