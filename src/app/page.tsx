'use client';

import NavigationBar from '@/components/navigationBar';
import TodayGoalDashboard from '@/app/components/TodayGoalDashboard';
import TodayTotalTime from '@/app/components/TodayStudyTime';
import PaceDial from './components/PaceDial';
import GoToGoalsPage from './components/GoToGoalsPage';

export default function Home() {
  return (
    <>
      <div className="flex-1 p-4 pb-24 flex flex-col gap-6">
        <GoToGoalsPage />
        <PaceDial />
        <TodayTotalTime />
        <TodayGoalDashboard />
      </div>
      <NavigationBar />
    </>
  );
}
