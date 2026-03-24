import NavigationBar from '@/components/navigationBar';
import TodayGoalDashboard from '@/app/components/TodayGoalDashboard';
import TodayGoalRatio from '@/app/components/TodayGoalRatio';

export default async function Home() {
  return (
    <>
      <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
        {/* 페이스 다이얼 */}
        {/* 오늘 총 공부시간 */}
        <TodayGoalRatio />

        <TodayGoalDashboard />
      </div>

      <NavigationBar />
    </>
  );
}
