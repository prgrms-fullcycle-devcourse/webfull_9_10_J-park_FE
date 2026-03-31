'use client';

import { useState, useEffect } from 'react';
import { NumberInput } from '@heroui/react';

interface GoalSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  targetAmount: number;
  unit: string;
  isPending: boolean;
}

export default function GoalSubmitModal({
  isOpen,
  onClose,
  onSubmit,
  targetAmount,
  unit,
  isPending,
}: GoalSubmitModalProps) {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setInputValue(undefined);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isPending || inputValue === undefined || inputValue <= 0) return;
    onSubmit(inputValue);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white p-8 rounded-xl flex flex-col items-center gap-8 shadow-2xl w-[360px]">
        <h2 className="text-2xl font-extrabold text-black tracking-tight">
          공부량 제출하기
        </h2>

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
          <span className="text-4xl">{targetAmount}</span>
          <span className="text-2xl pt-2">{unit}</span>
        </div>

        <div className="w-full flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isPending || inputValue === undefined || inputValue <= 0}
            className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isPending ? '제출 중...' : '제출하고 종료하기'}
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
