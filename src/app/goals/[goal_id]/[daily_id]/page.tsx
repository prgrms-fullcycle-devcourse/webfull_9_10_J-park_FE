import NavigationBar from '@/components/navigationBar';
import ClientRouter from '@/components/ClientRouter';
import TodayGoalDailyDetail from '@/components/today-goal/TodayGoalDailyDetail';

export default function DailyGoalDetailPage() {
  return (
    <ClientRouter>
      <div className="flex-1 min-h-screen w-full p-4 flex flex-col pb-24 overflow-y-auto scrollbar-hide bg-[#2c2c2c]">
        {/* 목표 정보(목표명, 할당량, 시간, 중지버튼 */}
        {/* 오늘의 목표 달성률 */}

        <TodayGoalDailyDetail />
      </div>

      <NavigationBar />
    </ClientRouter>
  );
}
