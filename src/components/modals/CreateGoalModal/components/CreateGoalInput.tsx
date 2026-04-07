import { Input, InputProps } from '@heroui/react';

export default function CreateGoalInput(props: InputProps) {
  return (
    <Input
      {...props}
      variant="underlined"
      labelPlacement="outside-top"
      isClearable
      classNames={{
        input: 'font-black text-2xl placeholder:text-gray-300',
        inputWrapper: 'shadow-none min-h-8 h-8 p-0 ',
        label: 'text-gray-400 mb-1',
      }}
    />
  );
}
