'use client';
import { STORAGE_KEYS } from '@/constants';
import { api } from '@/lib/axios';
import { EndTimer, EndTimerResponse } from '@/types/timer';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  NumberInput,
  useDisclosure,
} from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FaStop } from 'react-icons/fa6';

interface Props {
  goalID: string;
  targetAmount: number;
}

export default function StopTimerModal({ goalID, targetAmount }: Props) {
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
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.startedDailyGoalID);
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
              onPress={() =>
                mutate({
                  goalId: Number(goalID),
                  currentCompletedAmount: actualAmount,
                })
              }
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
