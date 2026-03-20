import DailyGoalList from './components/DailyGoalList';

export default function GoalDetail() {
  return (
    <main className="flex w-dvw min-h-screen flex-col items-center justify-center gap-6 p-8">
      {/*
       * 목표 세부 정보 컴포넌트
       */}
      {/*
       * 목표 진행도 컴포넌트
       */}
      {/*
       * 목표 총 공부시간
       */}
      <DailyGoalList />
      목표 상세페이지
    </main>
  );
}
