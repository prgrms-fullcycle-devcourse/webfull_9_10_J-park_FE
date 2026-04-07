import { Button } from '@heroui/react';
import CreateGoalInput from './CreateGoalInput';
import { useEffect, useRef } from 'react';
import { useLocalCreateGoal } from '../local-store/useLocalCreateGoal';

export default function TitleStep() {
  const ref = useRef<HTMLInputElement>(null);
  const { title, setTitle, next } = useLocalCreateGoal();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      const value = ref.current.value;
      ref.current.setSelectionRange(value.length, value.length);
    }
  }, []);

  return (
    <div className="animate-fadeIn flex flex-col h-full justify-between bg-white">
      <div className="p-6">
        <h1 className="font-bold text-2xl mb-4">
          목표 이름을 무엇으로 할까요?
        </h1>
        <CreateGoalInput
          ref={ref}
          value={title}
          maxLength={50}
          onValueChange={setTitle}
          label="목표 이름입력"
          errorMessage="목표명을 입력해주세요"
          isRequired
        />
      </div>
      <Button
        fullWidth
        radius="none"
        size="lg"
        color="primary"
        isDisabled={title.trim() === '' || !title}
        onPress={next}
      >
        다음
      </Button>
    </div>
  );
}
