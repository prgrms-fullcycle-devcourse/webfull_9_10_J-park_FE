'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@heroui/react';
import { CgAddR } from 'react-icons/cg';

import TitleStep from './components/TitleStep';
import DetailStep from './components/DetailStep';
import TotalAmountStep from './components/TotalAmountStep';
import DateStep from './components/DateStep';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useCallback, useEffect, useState } from 'react';
import { useLocalCreateGoal } from './local-store/useLocalCreateGoal';

export default function CreateGoalModal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    (() => {
      const userAgent = navigator.userAgent || '';
      const mobile = /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());
      setIsMobile(mobile);
    })();
  }, []);

  const { step, prev } = useLocalCreateGoal();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOnBack = useCallback(() => {
    if (step === 0) {
      onClose();
    } else {
      prev();
    }
  }, [step, prev, onClose]);

  return (
    <>
      <Button
        radius="none"
        className="[&>svg]:shrink-0 col-span-1 w-full h-full border-t-1 border-slate-200 text-success-400 "
        onPress={onOpen}
        isIconOnly
        variant="light"
      >
        <CgAddR size={28} />
      </Button>
      <Modal
        hideCloseButton
        size={isMobile ? '5xl' : 'sm'}
        isOpen={isOpen}
        placement="center"
        className="overflow-hidden"
        onOpenChange={onOpenChange}
        classNames={{
          base: `${isMobile ? 'h-full rounded-none m-0 p-0' : ''}`,
        }}
      >
        <ModalContent>
          <ModalBody className="p-0">
            <div className="w-full flex justify-between bg-gray-50 px-4 py-2">
              <Button variant="light" isIconOnly onPress={handleOnBack}>
                <IoChevronBackOutline size={24} />
              </Button>
            </div>
            {step === 0 && <TitleStep />}
            {step === 1 && <DetailStep />}
            {step === 2 && <TotalAmountStep />}
            {step === 3 && <DateStep onClose={onClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
