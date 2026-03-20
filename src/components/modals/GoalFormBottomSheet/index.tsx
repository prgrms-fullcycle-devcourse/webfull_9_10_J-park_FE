'use client';

import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { FaChevronLeft } from 'react-icons/fa6';

import { useCallback, useEffect, useRef, useState } from 'react';

import { IoAdd } from 'react-icons/io5';
import { useCreateGoalFormStore } from './stores/useCreateGoalFormStore';
import GoalInfoForm from './components/GoalInfoForm';
import GoalCategoryForm from './components/GoalCategoryForm';
import GoalDateForm from './components/GoalDateForm';

const MAX_STEPS = 2;
const modalTitles = ['정보 입력', '총량 설정', '기한 설정'];

export default function GoalFormBottomSheet() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);
  const { reset } = useCreateGoalFormStore();

  const onNext = useCallback(() => {
    if (currentStep < MAX_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);
  const onPrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };
  const onReset = () => {
    setCurrentStep(0);
    reset();
    onClose();
  };
  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <>
      <Button radius="full" onPress={onOpen} isIconOnly>
        <IoAdd size={28} />
      </Button>
      <Modal
        hideCloseButton
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        className="overflow-x-hidden"
      >
        <ModalContent>
          <ModalHeader className="flex justify-between items-center">
            <span>
              {currentStep > 0 && (
                <Button isIconOnly variant="light" size="sm" onPress={onPrev}>
                  <FaChevronLeft size={16} />
                </Button>
              )}
              <span>목표 생성하기: {modalTitles[currentStep]}</span>
            </span>
            <span className="text-sm text-gray-400">
              {currentStep + 1}/{MAX_STEPS + 1}
            </span>
          </ModalHeader>
          <ModalBody>
            <Form
              className="relative flex flex-row gap-6 transition-transform duration-500 ease-in-out scrollbar-hide"
              style={{
                transform: `translateX(calc(${-currentStep * 100}% - (${currentStep} * 1.5rem)))`,
              }}
              onSubmit={onSubmit}
            >
              <GoalInfoForm />
              <GoalCategoryForm />
              <GoalDateForm />
            </Form>
          </ModalBody>
          <ModalFooter className="flex flex-col">
            {currentStep < MAX_STEPS ? (
              <Button color="primary" size="lg" onPress={onNext} fullWidth>
                다음으로
              </Button>
            ) : (
              <Button color="primary" size="lg" type="submit" fullWidth>
                생성하기
              </Button>
            )}
            <Button
              className="bg-inherit text-gray-400"
              size="sm"
              onPress={onReset}
              fullWidth
            >
              취소하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
