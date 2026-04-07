import { Button } from '@heroui/react';

import { useEffect, useRef } from 'react';
import { useLocalCreateGoal } from '../local-store/useLocalCreateGoal';
import CreateGoalTextarea from './CreateGoalTextarea';

export default function DetailStep() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { detail, setDetail, next } = useLocalCreateGoal();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      const value = ref.current.value;
      ref.current.setSelectionRange(value.length, value.length);
    }
  }, []);

  return (
    <div className="animate-fadeIn h-full flex flex-col bg-white">
      <div className="p-6">
        <h1 className="font-bold text-2xl mb-4">
          목표에 대해 간략하게 설명해주세요
        </h1>
        <CreateGoalTextarea
          ref={ref}
          value={detail}
          maxLength={100}
          onValueChange={setDetail}
          label="설명 입력"
          errorMessage="목표에 대해서 입력해주세요"
          isRequired
        />
      </div>
      <Button
        fullWidth
        radius="none"
        size="lg"
        color="primary"
        className="mt-auto"
        isDisabled={detail.trim() === '' || !detail}
        onPress={next}
      >
        다음
      </Button>
    </div>
  );
}
