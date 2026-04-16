'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

interface Props {
  goalTitle: string;
  goalID: number;
}

export default function DeleteConfirmationModal({ goalTitle, goalID }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => api.delete(`/goals/${goalID}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      router.push('/goals');
    },
  });

  return (
    <>
      <Button
        onPress={onOpen}
        variant="flat"
        color="danger"
        className="w-full h-11 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <HiOutlineTrash size={18} />
        목표 삭제하기
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>삭제하기</ModalHeader>
              <ModalBody>
                <span>
                  <b>&quot;{goalTitle}&quot;</b>
                  목표를 삭제하시겠습니까?
                </span>
              </ModalBody>
              <ModalFooter className="flex flex-col">
                <Button
                  fullWidth
                  variant="flat"
                  color="danger"
                  isLoading={mutation.isPending}
                  onPress={() => {
                    mutation.mutate();
                  }}
                >
                  삭제하기
                </Button>
                <Button fullWidth variant="light" onPress={onClose}>
                  취소하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
