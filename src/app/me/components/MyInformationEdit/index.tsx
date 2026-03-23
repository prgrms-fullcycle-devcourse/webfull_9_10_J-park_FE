'use client';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import { LuUser } from 'react-icons/lu';

interface Props {
  userEditInfo: {
    username: string;
    profileImage: string;
  };
}
export default function MyInformationEdit({ userEditInfo }: Props) {
  const [username, setUsername] = useState(() => userEditInfo.username);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnClickEdit = (isEditing: boolean) => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

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
              value={username}
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
            className={`${isEditing ? 'bg-success-400 text-white text-md' : 'bg-gray-200 text-gray-400 text-md'}`}
            onPress={() => handleOnClickEdit(isEditing)}
          >
            {isEditing ? '저장' : '수정'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
