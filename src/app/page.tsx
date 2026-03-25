import NavigationBar from '@/components/navigationBar';
import TodayGoalDashboard from '@/app/components/TodayGoalDashboard';
import TodayGoalRatio from '@/app/components/TodayGoalRatio';
import PaceDial from './components/PaceDial';

export default async function Home() {
  return (
    <>
      <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
        <PaceDial />
        <TodayGoalRatio />

        <TodayGoalDashboard />
      </div>

      <NavigationBar />
    </>
  );
}
