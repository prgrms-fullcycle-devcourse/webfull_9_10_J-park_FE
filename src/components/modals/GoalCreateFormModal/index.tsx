'use client';

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { FaChevronLeft } from 'react-icons/fa6';
import { CgAddR } from 'react-icons/cg';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCreateGoalFormStore } from './stores/useCreateGoalFormStore';
import GoalInfoForm from './components/GoalInfoForm';
import GoalCategoryForm from './components/GoalCategoryForm';
import GoalDateForm from './components/GoalDateForm';

import GoalConfirmation from './components/GoalConfirmation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { CreatedGoal, CreateGoalResponse } from '@/types/api';

const MAX_STEPS = 3;
const modalTitles = ['정보 입력', '총량 설정', '기한 설정'];
type GoalParams = {
  title: string;
  detail: string | undefined;
  categoryId: number;
  totalAmount: number;
  startDate: string;
  endDate: string;
};
export default function GoalCreateFormModal() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);
  const {
    data,
    mutate: mutateCreateGoal,
    isPending,
    isSuccess,
  } = useMutation<CreatedGoal, Error, GoalParams>({
    mutationKey: ['create', 'goal'],
    mutationFn: (params) =>
      api.post<CreateGoalResponse>('/goals', params).then((res) => res.data),
  });

  const { title, detail, category, totalAmount, startDate, endDate, reset } =
    useCreateGoalFormStore();

  const isValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        if (title && title !== '') {
          return true;
        } else {
          return false;
        }
      case 1:
        if (Number(totalAmount) > 0 && category && category !== '') {
          return true;
        } else {
          return false;
        }
      default:
        if (startDate && endDate) {
          return true;
        } else {
          return false;
        }
    }
  }, [currentStep, title, totalAmount, category, startDate, endDate]);

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
    const params = {
      title,
      detail,
      totalAmount: Number(totalAmount),
      categoryId: Number(category),
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    };
    mutateCreateGoal(params);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    }
  }, [isSuccess, queryClient]);

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
            {isSuccess && (
              <div className="absolute flex flex-col gap-4 items-center justify-center text-2xl top-0 left-0 min-w-full min-h-full z-50 bg-white">
                <p>
                  <b className="text-success-400">성공적</b>으로 생성되었습니다!
                </p>
                <Button
                  as={Link}
                  href={`/goals/${data.id}`}
                  color="primary"
                  size="lg"
                  className="mb-6"
                >
                  데일리 목표 바로가기
                </Button>
                <Button
                  variant="light"
                  size="lg"
                  className="mb-6"
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                >
                  닫기
                </Button>
              </div>
            )}
            <div
              className="relative flex flex-row gap-6 transition-transform duration-500 ease-in-out scrollbar-hide"
              style={{
                transform: `translateX(calc(${-currentStep * 100}% - (${currentStep} * 1.5rem)))`,
              }}
            >
              <GoalInfoForm />
              <GoalCategoryForm />
              <GoalDateForm />
              <GoalConfirmation />
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-col">
            {currentStep < MAX_STEPS ? (
              <Button
                isDisabled={!isValid}
                color="primary"
                size="lg"
                onPress={onNext}
                fullWidth
              >
                다음으로
              </Button>
            ) : (
              <Button
                color="primary"
                size="lg"
                fullWidth
                onPress={onSubmit}
                isLoading={isPending}
                isDisabled={isPending}
              >
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
