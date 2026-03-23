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

interface Props {
  goalTitle: string;
  goalID: number;
}

export default function DeleteConfirmationModal({ goalTitle, goalID }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        variant="light"
        className="text-slate-400 -mr-2"
      >
        <HiOutlineTrash size={24} />
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
                <Button fullWidth variant="flat" color="danger">
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
