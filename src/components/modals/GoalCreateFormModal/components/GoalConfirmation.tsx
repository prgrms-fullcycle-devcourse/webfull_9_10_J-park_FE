import { getUnit } from '@/lib/utils';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

export default function GoalConfirmation() {
  const { title, detail, category, totalAmount, startDate, endDate } =
    useCreateGoalFormStore();
  const { year: sYear, month: sMonth, day: sDay } = startDate;
  const { year: eYear, month: eMonth, day: eDay } = endDate;
  return (
    <section className="flex flex-col justify-center min-w-full [&>div>label]:text-slate-400">
      <div className="flex flex-col text-center text-xl [&>div>b]:text-success-400">
        <div>
          <span className="font-bold text-4xl text-success-400">
            &quot;{title}&quot;
          </span>
        </div>
        ({detail})
        <div className="flex justify-center my-2 text-2xl">
          <b>{sMonth}</b>월 <b>{sDay}</b>
          일부터 <b>{eMonth}</b>월 <b> {eDay}</b>일까지
        </div>
        <div className="flex justify-center my-2 text-2xl items-baseline">
          <b className="mr-2 text-4xl">{totalAmount}</b>{' '}
          {getUnit(Number(category))}
        </div>
        을 달성하기 위해 등불이 도와드릴까요?
      </div>
    </section>
  );
}
