'use client';

import TodayGoalDashboard from './components/TodayGoalDashboard';
import TodayTotalTime from './components/TodayStudyTime';
import PaceDial from './components/PaceDial';
import GoToGoalsPage from './components/GoToGoalsPage';
import NavigationBar from '@/components/navigationBar';
import UserInfoCard from './components/UserInfoCard';
import UserRankingInfoCard from './components/UserRankingInfoCard';

export default function Home() {
  return (
    <>
      <div className="flex-1 p-4 pb-24 flex flex-col gap-4">
        <UserInfoCard />
        <PaceDial />
        <TodayTotalTime />
        <UserRankingInfoCard />
        <TodayGoalDashboard />
        <GoToGoalsPage />
      </div>
      <NavigationBar />
    </>
  );
}
