import NavigationBar from '@/components/navigationBar';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import TodayGoalDashboard from '@/components/today-goal/TodayGoalDashboard';
import ClientRouter from '@/components/ClientRouter';

const mobileClasses =
  'flex max-w-dvw min-w-dvw max-h-dvh min-h-dvh flex-col overflow-y-auto scrollbar-hide bg-amber-200';
const desktopClasses =
  'relative flex max-w-[430px] min-w-[430px] max-h-[932px] min-h-[430px] rounded-2xl flex-col overflow-y-auto scrollbar-hide bg-amber-200';

export default async function Home() {
  const headerList = await headers();
  const ua = userAgent({ headers: headerList });
  const isMobile = ua.device.type === 'mobile';

  return (
    <main className={isMobile ? mobileClasses : desktopClasses}>
      <ClientRouter>
        <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
          {/* 페이스 다이얼 */}
          {/* 오늘 총 공부시간 */}
          {/* 오늘의 목표 달성률 */}
          <TodayGoalDashboard />
        </div>
        <NavigationBar />
      </ClientRouter>
    </main>
  );
}
