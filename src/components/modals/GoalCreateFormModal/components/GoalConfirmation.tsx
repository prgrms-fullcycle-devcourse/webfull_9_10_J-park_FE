import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

export default function GoalConfirmation() {
  const { title, detail, category, totalAmount, startDate, endDate, reset } =
    useCreateGoalFormStore();
  return (
    <section className="flex justify-center min-w-full">
      <h1>{title}</h1>
      <p>{detail}</p>
      <p>
        <b>{totalAmount}</b>
        {category}
      </p>
      <div>
        <span>{startDate.toString()}</span>
        <span>{endDate.toString()}</span>
      </div>
    </section>
  );
}
