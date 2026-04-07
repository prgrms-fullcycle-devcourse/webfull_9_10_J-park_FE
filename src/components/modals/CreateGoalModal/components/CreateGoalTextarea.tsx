import { Textarea, TextAreaProps } from '@heroui/react';

export default function CreateGoalTextarea(props: TextAreaProps) {
  return (
    <Textarea
      {...props}
      variant="underlined"
      className="scrollbar-hide"
      classNames={{
        input: 'font-black text-2xl placeholder:text-gray-300',
        inputWrapper: 'min-h-8 h-8 p-0 ',
        label: 'text-gray-400 mb-1',
      }}
    />
  );
}
