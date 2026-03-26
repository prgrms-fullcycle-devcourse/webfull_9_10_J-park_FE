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
import { CgAddR } from 'react-icons/cg';

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useCreateGoalFormStore } from './stores/useCreateGoalFormStore';
import GoalInfoForm from './components/GoalInfoForm';
import GoalCategoryForm from './components/GoalCategoryForm';
import GoalDateForm from './components/GoalDateForm';

import GoalConfirmation from './components/GoalConfirmation';

const MAX_STEPS = 3;
const modalTitles = ['정보 입력', '총량 설정', '기한 설정'];

export default function GoalCreateFormModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);

  const {
    title,
    detail,
    category,
    totalAmount,
    startDate,
    endDate,

    reset,
  } = useCreateGoalFormStore();

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      title,
      detail,
      totalAmount,
      category,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    };
    // const res = axios.post('/goals', {
    //   title,
    //   detail,
    //   totalAmount,
    //   category,
    //   startDate,
    //   endDate,
    //   quota,
    // });
    console.log(params);
  };

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
              <GoalConfirmation />
            </Form>
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
              <Button color="primary" size="lg" fullWidth type="submit">
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
