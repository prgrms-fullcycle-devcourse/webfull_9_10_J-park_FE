import NavigationBar from '@/components/navigationBar';
import DailyGoalTimer from './components/DailyGoalTimer';
import TodayGoalDailyDetail from '@/app/goals/[goal_id]/[daily_id]/components/TodayGoalDailyDetail';

export default function DailyGoalDetailPage() {
  return (
    <>
      <div className="flex-1 min-h-screen w-full overflow-y-auto scrollbar-hide bg-[#2c2c2c]">
        <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
          <p className="text-white">데일리 목표 상세 페이지</p>

          <DailyGoalTimer goalId={1} goalTitle="목표 이름" quotaText="할당량" />

          {/* 오늘의 목표 달성률 (초록바 추후 추가해야함)*/}
          <TodayGoalDailyDetail />
        </div>
      </div>
      <NavigationBar />
    </>
  );
}
