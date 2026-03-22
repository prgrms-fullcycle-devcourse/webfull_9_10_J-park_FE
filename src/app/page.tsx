import NavigationBar from '@/components/navigationBar';
import TodayGoalDashboard from '@/components/today-goal/TodayGoalDashboard';
import ClientRouter from '@/components/ClientRouter';

export default async function Home() {
  return (
    <ClientRouter>
      <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
        대시보드 페이지
        {/* 페이스 다이얼 */}
        {/* 오늘 총 공부시간 */}
        {/* 오늘의 목표 달성률 */}
        <TodayGoalDashboard />
      </div>
      <NavigationBar />
    </ClientRouter>
  );
}
