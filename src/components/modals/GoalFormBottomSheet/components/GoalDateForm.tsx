import { DatePicker, RangeCalendar } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

export default function GoalDateForm() {
  const { startDate, dueDate, setStartDate, setDueDate } =
    useCreateGoalFormStore();

  return (
    <section className="flex flex-col">
      <RangeCalendar calendarWidth="100%" />
    </section>
  );
}
