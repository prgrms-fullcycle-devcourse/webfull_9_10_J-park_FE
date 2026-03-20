'use client';
import GoalFormBottomSheet from '../modals/GoalFormBottomSheet';
import NavItem from './components/NavItem';

import { STYLE } from '@/constants';

export default function NavigationBar() {
  return (
    <div
      className={`absolute z-50 bottom-0 w-full flex justify-between p-4 left-0 min-h-[${STYLE.NAVBAR_HEIGHT}] border-t-1 border-gray-200 bg-white`}
    >
      <NavItem type="home" href="/" />
      <NavItem type="goals" href="/goals" />
      <GoalFormBottomSheet />
      <NavItem type="community" href="/community" />
      <NavItem type="profile" href="/me" />
    </div>
  );
}
