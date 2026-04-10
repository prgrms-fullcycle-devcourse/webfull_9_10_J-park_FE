'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  addToast,
  Slider,
  Input,
} from '@heroui/react';
import { FcSurvey } from 'react-icons/fc';

interface GoalSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<void>;

  totalTargetAmount: number;
  dailyTargetAmount: number;

  currentAmount: number;
  unit: string;
  isPending: boolean;
  goalTitle: string;
}

export default function GoalSubmitModal({
  isOpen,
  onClose,
  onSubmit,
  totalTargetAmount,
  dailyTargetAmount,
  currentAmount,
  unit,
  isPending,
  goalTitle,
}: GoalSubmitModalProps) {
  const [inputValue, setInputValue] = useState<number>(currentAmount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputValue(currentAmount);
      setIsSubmitting(false);
    }
  }, [isOpen, currentAmount]);

  const dynamicMax = useMemo(() => {
    return Math.max(dailyTargetAmount, inputValue);
  }, [dailyTargetAmount, inputValue]);

  const handleMinus = (amount: number) => {
    setInputValue((prev) => Math.max(0, prev - amount));
  };

  const handlePlus = (amount: number) => {
    setInputValue((prev) => prev + amount);
  };

  const handleSubmit = async () => {
    if (isPending || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(inputValue);

      const percentage =
        dailyTargetAmount > 0 ? (inputValue / dailyTargetAmount) * 100 : 0;
      const formattedPercentage = Math.round(percentage);

      addToast({
        title: '공부를 종료합니다',
        description: `총 ${formattedPercentage}%만큼 진행하셨습니다.`,
        classNames: {
          base: 'bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl px-5 py-4 flex gap-3 shadow-lg',
        },
        icon: (
          <div className="text-2xl text-emerald-600">
            {' '}
            <FcSurvey />{' '}
          </div>
        ),
      });

      onClose();
    } catch (error) {
      console.error('제출 실패:', error);
      addToast({
        title: '제출 실패',
        description: '공부량 저장에 실패했습니다. 다시 시도해 주세요.',
        classNames: {
          base: 'bg-rose-50 text-rose-600 border border-rose-200 rounded-xl px-5 py-4 flex gap-3 shadow-lg',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      hideCloseButton
      placement="center"
      shouldBlockScroll={true}
      classNames={{
        base: 'w-[380px] max-w-[380px] bg-transparent shadow-none',
        backdrop: 'bg-black/60',
      }}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0">
            <div className="bg-white p-8 rounded-xl flex flex-col items-center gap-6 shadow-2xl w-full">
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-2xl font-extrabold text-black tracking-tight">
                  공부량 제출하기
                </h2>
                <p className="text-lg font-medium text-gray-500 break-keep">
                  {goalTitle}
                </p>
              </div>

              <div className="flex flex-col w-full gap-5 border-t pt-6">
                <span className="text-lg font-bold text-orange-500 text-center bg-orange-50 py-2.5 rounded-md">
                  총 목표량: {totalTargetAmount} {unit}
                </span>

                <div className="flex flex-col gap-4 w-full mt-2 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="flex items-end justify-between w-full mb-2">
                    <span className="text-sm font-bold text-gray-500">
                      진행한 공부량
                    </span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        variant="underlined"
                        value={String(inputValue)}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                        className="w-20"
                        classNames={{
                          input:
                            'text-2xl font-extrabold text-orange-500 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                          inputWrapper: 'border-orange-200 after:bg-orange-500',
                        }}
                      />
                      <span className="text-lg font-bold text-gray-400">
                        / {dailyTargetAmount} {unit}
                      </span>
                    </div>
                  </div>

                  <Slider
                    size="md"
                    step={1}
                    color="warning"
                    maxValue={dynamicMax}
                    minValue={0}
                    value={inputValue}
                    onChange={(val) => setInputValue(val as number)}
                    aria-label="공부량 조절 슬라이더"
                    className="max-w-md w-full"
                    classNames={{
                      track: 'bg-gray-200',
                      filler: 'bg-orange-400',
                      thumb: 'w-6 h-6 bg-white border-2 border-orange-500',
                    }}
                  />

                  <div className="flex justify-between gap-2 mt-1">
                    <Button
                      size="sm"
                      variant="flat"
                      className="bg-gray-200 font-bold text-gray-700 min-w-12"
                      onPress={() => handleMinus(1)}
                    >
                      -1
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-orange-100 font-bold text-orange-600 min-w-12"
                        onPress={() => handlePlus(1)}
                      >
                        +1
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-orange-100 font-bold text-orange-600 min-w-12"
                        onPress={() => handlePlus(5)}
                      >
                        +5
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-orange-100 font-bold text-orange-600 min-w-12"
                        onPress={() => handlePlus(10)}
                      >
                        +10
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex gap-3 mt-4">
                <Button
                  onPress={handleSubmit}
                  isLoading={isPending || isSubmitting}
                  className="flex-[3] h-14 bg-orange-500 text-white font-extrabold rounded-lg hover:bg-orange-600 transition-colors text-base"
                >
                  제출하고 종료하기
                </Button>

                <Button
                  onPress={onClose}
                  className="flex-[2] h-14 bg-gray-400 text-white font-extrabold rounded-lg hover:bg-gray-500 transition-colors text-lg"
                >
                  취소
                </Button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
