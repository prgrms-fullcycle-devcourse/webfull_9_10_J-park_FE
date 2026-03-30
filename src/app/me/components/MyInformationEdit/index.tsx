'use client';

import { api } from '@/lib/axios';
import { User } from '@/types/user';
import { addToast, Button, Card, CardBody, Input } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LuUser } from 'react-icons/lu';

interface Props {
  userInfo: {
    nickname: string;
  };
}
export default function MyInformationEdit({ userInfo }: Props) {
  const { mutate } = useMutation<User, Error, { name: string }>({
    mutationKey: ['users', 'me'],
    mutationFn: (params) => api.patch('/users', params),
    onSuccess: () => {
      addToast({
        title: '프로필 별명을 수정했습니다',
        description: '프로필 별명을 성공적으로 수정했습니다',
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
  });
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(() => userInfo.nickname);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClickEdit = useCallback(() => {
    if (isEditing) {
      mutate({ name: username });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [isEditing, username, mutate]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <LuUser size={20} className="text-slate-400 mr-2" />
            <Input
              size="lg"
              variant="bordered"
              defaultValue={username}
              onValueChange={setUsername}
              ref={inputRef}
              className={`${isEditing ? '' : 'hidden'}`}
            />
            <p
              className={`${isEditing ? 'hidden' : ''}`}
              style={{ lineHeight: 0 }}
            >
              {username}
            </p>
          </div>
          <Button
            size="sm"
            radius="full"
            className={`${isEditing ? 'bg-success-400 text-white text-md' : 'bg-gray-200  text-md'}`}
            onPress={() => handleOnClickEdit()}
          >
            {isEditing ? '저장' : '수정'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
