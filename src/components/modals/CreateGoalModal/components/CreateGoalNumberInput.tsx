import { NumberInput, NumberInputProps } from '@heroui/react';

export default function CreateGoalNumberInput(props: NumberInputProps) {
  return (
    <NumberInput
      {...props}
      variant="underlined"
      labelPlacement="outside-top"
      isClearable
      hideStepper
      classNames={{
        input: 'font-black text-2xl placeholder:text-gray-300',
        inputWrapper: 'shadow-none min-h-8 h-8 p-0 ',
        label: 'text-gray-400 mb-1',
      }}
    />
  );
}
