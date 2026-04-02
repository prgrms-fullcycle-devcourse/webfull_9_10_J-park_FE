'use client';

import { api } from '@/lib/axios';
import { User } from '@/types/user';
import { addToast, Button, Input } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  userInfo: {
    nickname: string;
    createdAt: string;
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
      if (username !== userInfo.nickname) {
        mutate({ name: username });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [isEditing, username, userInfo, mutate]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="flex bg-white rounded-t-2xl justify-between items-center p-6">
      <div>
        <small className="text-gray-600">{userInfo.createdAt}</small>
        <Input
          variant="bordered"
          defaultValue={username}
          onValueChange={setUsername}
          ref={inputRef}
          className={`${isEditing ? '' : 'hidden'}`}
          classNames={{
            input: 'font-black text-2xl border-none',
            inputWrapper: 'border-none shadow-none min-h-8 h-8',
          }}
        />
        <p className={`${isEditing ? 'hidden' : ''} font-black text-2xl`}>
          {username}
        </p>
      </div>
      <Button
        radius="full"
        className={`${isEditing ? 'bg-success-400 text-white text-md' : 'bg-gray-200  text-md'}`}
        onPress={() => handleOnClickEdit()}
      >
        {isEditing ? '저장' : '수정'}
      </Button>
    </div>
  );
}
