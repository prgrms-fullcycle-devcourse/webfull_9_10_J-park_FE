import NavigationBar from '@/components/navigationBar';
import ClientRouter from '@/components/ClientRouter';
import TodayGoalDailyDetail from '@/components/today-goal/TodayGoalDailyDetail';

export default function DailyGoalDetailPage() {
  return (
    <ClientRouter>
      <div className="flex-1 min-h-screen w-full overflow-y-auto scrollbar-hide bg-[#2c2c2c]">
        <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
          <p className="text-white">데일리 목표 상세 페이지</p>
          {/* 목표 정보(목표명, 할당량, 시간, 중지버튼 */}
          {/* 오늘의 목표 달성률 */}
          <TodayGoalDailyDetail />
        </div>
      </div>
      <NavigationBar />
    </ClientRouter>
  );
}
