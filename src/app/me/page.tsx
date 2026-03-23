import { Page } from '@/components/ui';

import MyInformation from './components/MyInformation';
import MyInformationEdit from './components/MyInformationEdit';
import MyGoals from './components/MyGoals';

const sampleData = {
  userId: 1, // 사용자 ID or UUID
  username: '닉네임 23', // 사용자 이름
  profileImage: 'https://picsum.photos/id/237/200/300', // 프로필 이미지
  totalTime: '04:43:00', // 오늘 총 목표를 위해 투자한 시간

  goals: [
    {
      id: 1, // 목표 ID
      title: '목표 1', // 목표 이름
      todayQuota: 3, // 오늘의 할당량
    },
    {
      id: 2, // 목표 ID
      title: '목표 2', // 목표 이름
      todayQuota: 2, // 오늘의 할당량
    },
    {
      id: 3, // 목표 ID
      title: '목표 3', // 목표 이름
      todayQuota: 5, // 오늘의 할당량s
    },
  ],

  createdAt: '2025-05-23', // 계정 생성일
};

export default function MePage() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <Page.Title>마이페이지</Page.Title>
      <MyInformation userInfo={{ ...sampleData }} />
      <MyInformationEdit userEditInfo={{ ...sampleData }} />
      <MyGoals goals={sampleData.goals} />
    </div>
  );
}
