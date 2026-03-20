import { DatePicker } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

export default function GoalDateForm() {
  const { startDate, dueDate, setStartDate, setDueDate } =
    useCreateGoalFormStore();
  return (
    <section className="flex flex-col gap-3 min-w-full">
      <DatePicker
        label="시작일자"
        labelPlacement="outside-top"
        value={startDate}
        onChange={(value) => setStartDate(value)}
      />
      <DatePicker
        label="종료일자"
        labelPlacement="outside-top"
        value={dueDate}
        onChange={(value) => setDueDate(value)}
      />
    </section>
  );
}
