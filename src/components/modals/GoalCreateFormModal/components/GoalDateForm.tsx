import { RangeCalendar } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

export default function GoalDateForm() {
  const { startDate, endDate, setStartDate, setEndDate } =
    useCreateGoalFormStore();

  return (
    <section className="flex justify-center min-w-full">
      <RangeCalendar
        value={{ start: startDate, end: endDate }}
        onChange={(value) => {
          setStartDate(value.start);
          setEndDate(value.end);
        }}
      />
    </section>
  );
}
