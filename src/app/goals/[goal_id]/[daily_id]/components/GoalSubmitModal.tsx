'use client';

import { useState, useEffect } from 'react';

interface GoalSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  targetAmount: number;
  unit?: string;
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
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isPending || !inputValue) return;
    onSubmit(Number(inputValue));
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white p-8 rounded-xl flex flex-col items-center gap-8 shadow-2xl w-[320px]">
        <h2 className="text-2xl font-extrabold text-black tracking-tight">
          공부량 제출하기
        </h2>

        <div className="flex items-center justify-center gap-3 text-black font-bold mt-2 w-full">
          <input
            type="number"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === '-' ||
                e.key === 'e' ||
                e.key === 'E' ||
                e.key === '+'
              ) {
                e.preventDefault();
              }
            }}
            placeholder="0"
            className="w-20 h-12 text-center text-2xl bg-white border border-gray-400 text-black outline-none rounded-md focus:border-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
          />
          <span className="text-3xl font-light text-gray-500">/</span>
          <span className="text-3xl">{targetAmount}</span>
          <span className="text-xl pt-1">{unit}</span>
        </div>

        <div className="w-full flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isPending || !inputValue}
            className="flex-1 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '제출 중...' : '제출하고 종료하기'}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
