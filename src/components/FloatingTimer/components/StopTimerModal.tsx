'use client';
import { STORAGE_KEYS } from '@/constants';
import { api } from '@/lib/axios';
import { EndTimer, EndTimerResponse } from '@/types/timer';
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  NumberInput,
  useDisclosure,
} from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  goalID: number;
  targetAmount: number;
}

export default function StopTimerModal({ goalID, targetAmount }: Props) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [actualAmount, setActualAmount] = useState(() => targetAmount);
  const { mutate, data } = useMutation<
    EndTimer,
    Error,
    { goalId: number; currentCompletedAmount: number }
  >({
    mutationFn: (params) =>
      api
        .post<EndTimerResponse>('/timers/end', { ...params, isPaused: true })
        .then((res) => res.data),
    onSuccess: (data) => {
      addToast({
        title: '공부를 종료합니다',
        description: `총 ${data.goalProgressRate}%만큼 진행하셨습니다.`,
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['goals', 'timer'] });
    },
  });
  return (
    <>
      <Button
        onPress={onOpen}
        className="shrink-0"
        radius="full"
        color="danger"
      >
        종료
      </Button>
      <Modal
        size="xs"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <ModalBody>
            <NumberInput
              label="완료 분량"
              labelPlacement="outside-top"
              size="lg"
              hideStepper
              variant="bordered"
              defaultValue={actualAmount}
              onValueChange={setActualAmount}
              endContent={<span className="font-bold">/{targetAmount}</span>}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onPress={() => {
                mutate({
                  goalId: Number(goalID),
                  currentCompletedAmount: actualAmount,
                });
                onClose();
              }}
            >
              종료하기
            </Button>
            <Button variant="light" onPress={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
