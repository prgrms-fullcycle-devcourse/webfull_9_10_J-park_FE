import GoalFormBottomSheet from '../modals/GoalFormBottomSheet';
import NavItem from './components/NavItem';

import { STYLE } from '@/constants';

export default function NavigationBar() {
  return (
    <>
      {/*
       * 네비게이션 바 뒤에 가려지 컨텐츠를 볼 수 없기 때문에 네비게이션 바 높이 만큼 뒤 컨텐츠를 올려주는 역할을 합니다.
       */}
      <div className={`min-h-[${STYLE.NAVBAR_HEIGHT}]`}></div>
      <nav
        className={`sticky flex justify-between p-4 w-full bottom-0 min-h-[${STYLE.NAVBAR_HEIGHT}] border-t-1 border-gray-200 bg-inherit`}
      >
        <NavItem type="home" href="/" />
        <NavItem type="goals" href="/goals" />
        <GoalFormBottomSheet />
        <NavItem type="community" href="/community" />
        <NavItem type="profile" href="/me" />
      </nav>
    </>
  );
}
