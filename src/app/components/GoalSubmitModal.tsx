'use client';

import { useState, useEffect } from 'react';
import { NumberInput } from '@heroui/react';

interface GoalSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;

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

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (
      isPending ||
      isSubmitting ||
      inputValue === undefined ||
      inputValue === currentAmount
    )
      return;

    setIsSubmitting(true);
    onSubmit(inputValue);
  };

  const isSubmitDisabled =
    isPending ||
    isSubmitting ||
    inputValue === undefined ||
    inputValue === currentAmount;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white p-8 rounded-xl flex flex-col items-center gap-8 shadow-2xl w-[360px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-extrabold text-black tracking-tight">
            공부량 제출하기
          </h2>
          <p className="text-lg font-medium text-gray-500 break-keep">
            {goalTitle}
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <span className="text-sm font-bold text-orange-500 text-center bg-orange-50 py-1.5 rounded-md">
            총 목표량: {totalTargetAmount} {unit}
          </span>

          <div className="flex items-center justify-center gap-4 text-black font-bold mt-2 w-full">
            <NumberInput
              value={inputValue}
              onValueChange={setInputValue}
              minValue={0}
              variant="bordered"
              placeholder="0"
              aria-label="공부량 입력"
              classNames={{
                base: 'w-32',
                inputWrapper: 'h-16',
                input: 'text-3xl font-bold text-center',
              }}
            />

            <span className="text-4xl font-light text-gray-400">/</span>

            <span className="text-4xl">{dailyTargetAmount}</span>
            <span className="text-2xl pt-2">{unit}</span>
          </div>
        </div>

        <div className="w-full flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isPending || isSubmitting ? '제출 중...' : '제출하고 종료하기'}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-4 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors text-lg"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
