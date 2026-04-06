'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  addToast,
  Select,
  SelectItem,
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
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputValue(currentAmount);
      setIsSubmitting(false);
    }
  }, [isOpen, currentAmount]);

  const amountOptions = useMemo(() => {
    return Array.from({ length: dailyTargetAmount + 1 }, (_, i) => ({
      label: String(i),
      value: String(i),
    }));
  }, [dailyTargetAmount]);

  const handleSubmit = async () => {
    if (isPending || isSubmitting || inputValue === undefined) return;

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
            <FcSurvey />
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

  const isSubmitDisabled =
    isPending || isSubmitting || inputValue === undefined;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      hideCloseButton
      placement="center"
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

                <div className="flex flex-col items-center justify-center gap-2 text-black mt-2 w-full">
                  <Select
                    label="진행한 공부량"
                    labelPlacement="outside"
                    placeholder="얼마나 진행하셨나요?"
                    variant="bordered"
                    selectedKeys={
                      inputValue !== undefined
                        ? new Set([String(inputValue)])
                        : new Set()
                    }
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected !== undefined) {
                        setInputValue(Number(selected));
                      }
                    }}
                    classNames={{
                      base: 'w-full',
                      trigger: 'h-14',
                      label: 'text-lg font-bold text-gray-900 pb-1.5',
                      value: 'text-xl font-bold text-gray-800',
                    }}
                  >
                    {amountOptions.map((opt) => (
                      <SelectItem key={opt.value} textValue={opt.label}>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-lg font-bold">{opt.label}</span>
                          <span className="text-gray-400 text-sm">{unit}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="w-full flex gap-3 mt-4">
                <Button
                  onPress={handleSubmit}
                  isLoading={isPending || isSubmitting}
                  disabled={isSubmitDisabled}
                  className="flex-[3] h-14 bg-orange-500 text-white font-extrabold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
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
