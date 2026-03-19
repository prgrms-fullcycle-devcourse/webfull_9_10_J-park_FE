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
import { useCallback, useState } from 'react';

import { IoAdd } from 'react-icons/io5';
import { useCreateGoalFormStore } from './stores/useCreateGoalFormStore';
import GoalInfoForm from './components/GoalInfoForm';
import GoalCategoryForm from './components/GoalCategoryForm';
import GoalDateForm from './components/GoalDateForm';

const MAX_STEPS = 2;

export default function GoalFormBottomSheet() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);
  const {
    name,
    description,
    category,
    totalAmount,
    startDate,
    dueDate,
    setName,
    setDescription,
  } = useCreateGoalFormStore();
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
  };

  return (
    <>
      <Button radius="full" onPress={onOpen} isIconOnly>
        <IoAdd size={28} />
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between">
                <span>목표 생성하기: 정보 입력</span>
                <span className="text-sm text-gray-400">
                  {currentStep + 1}/{MAX_STEPS + 1}
                </span>
              </ModalHeader>
              <ModalBody>
                <Form
                  className="relative flex flex-row transition-transform duration-500 ease-in-out  scrollbar-hide"
                  style={{ transform: `translateX(${-currentStep * 100}%)` }}
                >
                  <GoalInfoForm />
                  <GoalCategoryForm />
                  <GoalDateForm />
                </Form>
              </ModalBody>
              <ModalFooter className="flex flex-col">
                <Button color="primary" size="lg" onPress={onNext} fullWidth>
                  {currentStep === MAX_STEPS ? '생성하기' : '다음으로'}
                </Button>
                <Button
                  className="bg-inherit text-gray-400"
                  size="sm"
                  onPress={onReset}
                  fullWidth
                >
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
