'use client';

import NavigationBar from '@/components/navigationBar';

import PaceIndicatorCard from './components/PaceIndicatorCard';
import TodayDailyGoalsCard from './components/TodayDailyGoalsCard';
import TodayStudyInfoCard from './components/TodayStudyInfoCard';
import OtherInfoCard from './components/OtherInfoCard';
import UserInfoCard from './components/UserInfoCard';

export default function DashboardPage() {
  return (
    <>
      <div className="w-full flex-1 p-4 pb-24 flex flex-col gap-4">
        <UserInfoCard />
        <PaceIndicatorCard />
        <TodayStudyInfoCard />
        <OtherInfoCard />
        <TodayDailyGoalsCard />
      </div>
      <NavigationBar />
    </>
  );
}
