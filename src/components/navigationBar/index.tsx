'use client';
import { usePathname } from 'next/navigation';

import { LuListTodo } from 'react-icons/lu';
import { AiFillHome } from 'react-icons/ai';
import { FaRankingStar } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';

import { ROUTE, STYLE } from '@/constants';
import CreateGoalModal from '../modals/CreateGoalModal';
import Link from 'next/link';

const selectedStyle = 'border-primary border-t-3 text-primary';
const notSelectedStyle = 'border-slate-200 border-t-1 text-slate-400';
export default function NavigationBar() {
  const pathname = usePathname();
  return (
    <>
      <div
        style={{
          minHeight: STYLE.NAVBAR_HEIGHT,
          minWidth: '100%',
        }}
      ></div>
      <div
        className={`absolute z-50 bottom-0 left-0 w-full grid grid-cols-5 justify-between bg-white`}
        style={{ minHeight: STYLE.NAVBAR_HEIGHT }}
      >
        <Link
          className={`${pathname === ROUTE.HOME ? selectedStyle : notSelectedStyle} w-full h-full flex items-center justify-center`}
          href={ROUTE.HOME}
        >
          <AiFillHome size={28} />
        </Link>
        <Link
          className={`${pathname === ROUTE.GOALS ? selectedStyle : notSelectedStyle} w-full h-full flex items-center justify-center`}
          href={ROUTE.GOALS}
        >
          <LuListTodo size={28} />
        </Link>
        <CreateGoalModal />
        <Link
          className={`${pathname === ROUTE.COMMUNITY ? selectedStyle : notSelectedStyle} w-full h-full flex items-center justify-center`}
          href={ROUTE.COMMUNITY}
        >
          <FaRankingStar size={28} />
        </Link>
        <Link
          className={`${pathname === ROUTE.ME ? selectedStyle : notSelectedStyle} w-full h-full flex items-center justify-center`}
          href={ROUTE.ME}
        >
          <FaUserCircle size={28} />
        </Link>
      </div>
    </>
  );
}
