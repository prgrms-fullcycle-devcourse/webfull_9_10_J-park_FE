'use client';

import NavigationBar from '@/components/navigationBar';
import UserInfoCard from './components/UserInfoCard';

import PaceIndicatorCard from './components/PaceIndicatorCard';
import TodayDailyGoalsCard from './components/TodayDailyGoalsCard';
import TodayStudyInfoCard from './components/TodayStudyInfoCard';
import OtherInfoCard from './components/OtherInfoCard';

export default function Home() {
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
