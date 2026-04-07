import { Button, Select, SelectItem } from '@heroui/react';
import { useEffect, useRef } from 'react';
import { useLocalCreateGoal } from '../local-store/useLocalCreateGoal';
import CreateGoalNumberInput from './CreateGoalNumberInput';
import { CATEGORIES } from '@/constants';

export default function TotalAmountStep() {
  const ref = useRef<HTMLInputElement>(null);
  const { totalAmount, category, step, setTotalAmount, setCategory, next } =
    useLocalCreateGoal();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      const value = ref.current.value;
      ref.current.setSelectionRange(value.length, value.length);
    }
  }, []);

  if (step !== 2) {
    return;
  }

  return (
    <div className="animate-fadeIn h-full flex flex-col bg-white">
      <div className="p-6">
        <div className="mb-4">
          <h1 className="font-bold text-2xl mb-4">목표 분량이 얼마인가요?</h1>
          <CreateGoalNumberInput
            ref={ref}
            value={totalAmount}
            onValueChange={setTotalAmount}
            label="종 분량"
            errorMessage="총 분량을 입력해주세요"
            isRequired
          />
        </div>
        <Select
          inert
          fullWidth
          label="어떤 분류의 목표인가요?"
          labelPlacement="outside-top"
          isRequired
          variant="underlined"
          value={category}
          items={CATEGORIES.map((n) => ({
            key: n.id,
            label: n.name,
          }))}
          onClose={() => {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }}
          placeholder="카테고리"
          classNames={{
            value: 'font-black text-2xl text-gray-300',
            trigger: 'shadow-none min-h-8 h-8 p-0 placeholder:text-gray-300',
          }}
          onSelectionChange={(keys) => setCategory(Number(keys.currentKey))}
        >
          {CATEGORIES.map((c) => (
            <SelectItem
              classNames={{
                title: 'font-bold text-xl',
              }}
              key={c.id}
            >
              {c.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button
        fullWidth
        radius="none"
        size="lg"
        color="primary"
        className="mt-auto"
        isDisabled={totalAmount === 0 || !totalAmount}
        onPress={next}
      >
        다음
      </Button>
    </div>
  );
}
