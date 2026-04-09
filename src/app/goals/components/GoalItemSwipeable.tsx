'use client';
import {
  Button,
  Link,
  Modal,
  ModalContent,
  useDisclosure,
} from '@heroui/react';
import { useRef, useState } from 'react';
import { FcFullTrash } from 'react-icons/fc';
import { FcSurvey } from 'react-icons/fc';

import { Goal } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface Props {
  goal: Goal;
}

const DELETE_BUTTON_WIDTH = 100;

export default function GoalItemSwipeable({ goal }: Props) {
  const [position, setPosition] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);
  const touchStartX = useRef(0);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => api.delete(`/goals/${goal.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const maxSwipe = DELETE_BUTTON_WIDTH;

  const onDelete = () => {
    mutation.mutate();
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    if (diff < 0) {
      setPosition(Math.max(diff, -maxSwipe));
    }
    if (diff >= 0) {
      setPosition(Math.min(diff, 0));
    }
  };

  const onTouchEnd = () => {
    if (position < -maxSwipe / 2) {
      setPosition(-maxSwipe);
      setIsSwiped(true);
    } else {
      setPosition(0);
      setIsSwiped(false);
    }
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    touchStartX.current = e.clientX;
  };

  const onDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentX = e.clientX;

    const diff = currentX - touchStartX.current;
    if (diff < 0 && diff < -maxSwipe / 2) {
      setPosition(-maxSwipe);
      setIsSwiped(true);
    } else {
      setPosition(0);
      setIsSwiped(false);
    }
  };

  return (
    <div className="animate-fadeIn relative transition-all flex items-center w-full h-24 overflow-hidden bg-slate-100">
      <Button
        isIconOnly
        color="danger"
        className="absolute top-0 right-0 h-full rounded-none transition-all flex items-center justify-center"
        style={{
          width: `${maxSwipe}px`,
          opacity: `${isSwiped ? '100%' : '0%'}`,
        }}
        onPress={onOpen}
      >
        <FcFullTrash size={24} />
      </Button>
      <div
        className="absolute top-0 left-0 w-full transition-transform bg-white"
        style={{
          transform: `translateX(${position}px)`,
        }}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <small className="px-6">
          {new Date(goal.endDate).toLocaleDateString('ko-kr', {
            month: 'long',
            day: 'numeric',
          })}
          까지
        </small>
        <Button
          as={Link}
          href={`goals/${goal.id}`}
          variant="light"
          radius="none"
          className="w-full h-full flex items-center gap-4 px-6 py-4"
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
              <p className="truncate max-w-full font-black text-xl -mb-2">
                {goal.title}
              </p>
              <small className="text-gray-600">{goal.description}</small>
            </div>
            <div className="text-right">
              <p className="font-black text-xl -mb-2">{goal.progressRate}%</p>
              <small className="text-gray-600">진행률</small>
            </div>
          </div>
        </Button>
      </div>
      <Modal
        size="xs"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        className="p-6"
      >
        <ModalContent>
          <p className="w-full text-center text-xl mb-6">
            <b>{goal.title}</b>를 삭제할까요?
          </p>
          <Button
            size="lg"
            color="danger"
            onPress={() => {
              onDelete();
              onClose();
            }}
          >
            삭제하기
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
