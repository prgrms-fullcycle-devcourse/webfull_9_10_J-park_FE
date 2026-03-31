import { Input, Textarea } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

export default function GoalInfoForm() {
  const { title, detail, setTitle, setDetail } = useCreateGoalFormStore();
  return (
    <section className="flex flex-col shrink-0 gap-3 min-w-full">
      <Input
        isRequired
        isClearable
        value={title}
        onValueChange={setTitle}
        size="lg"
        variant="bordered"
        label="목표"
        type="text"
        placeholder="목표 이름을 작성해주세요."
        validate={(value) => {
          if (!value || value === '') {
            return '목표 이름을 작성해주세요';
          }
        }}
      />
      <Textarea
        value={detail || ''}
        onValueChange={setDetail}
        size="lg"
        variant="bordered"
        label="목표설명"
        placeholder="묙표에 대해 간략하게 설명해주세요."
      />
    </section>
  );
}
