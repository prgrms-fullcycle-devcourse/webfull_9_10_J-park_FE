'use client';
import { usePathname } from 'next/navigation';
import { Button, Link } from '@heroui/react';
import { LuListTodo } from 'react-icons/lu';
import { AiFillHome } from 'react-icons/ai';
import { FaRankingStar } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';

import { ROUTE, STYLE } from '@/constants';
import GoalCreateFormModal from '../modals/GoalCreateFormModal';

const selectedStyle = 'border-success-400 border-t-3 text-success-400';
const notSelectedStyle = 'border-slate-200 border-t-1 text-slate-400';
export default function NavigationBar() {
  const pathname = usePathname();
  return (
    <div
      className={`absolute z-50 bottom-0 left-0 w-full grid grid-cols-5 justify-between bg-white`}
      style={{ minHeight: STYLE.NAVBAR_HEIGHT }}
    >
      <Button
        className={`bg-transparent w-full h-full col-span-1 [&>svg]:shrink-0 ${pathname === ROUTE.HOME ? selectedStyle : notSelectedStyle}`}
        radius="none"
        as={Link}
        href={ROUTE.HOME}
        isIconOnly
      >
        <AiFillHome size={28} />
      </Button>
      <Button
        className={`bg-transparent w-full h-full col-span-1 [&>svg]:shrink-0 ${pathname === ROUTE.GOALS ? selectedStyle : notSelectedStyle}`}
        radius="none"
        as={Link}
        href={ROUTE.GOALS}
        isIconOnly
      >
        <LuListTodo size={28} />
      </Button>
      <GoalCreateFormModal />
      <Button
        className={`bg-transparent w-full h-full col-span-1 [&>svg]:shrink-0 ${pathname === ROUTE.COMMUNITY ? selectedStyle : notSelectedStyle}`}
        radius="none"
        as={Link}
        href={ROUTE.COMMUNITY}
        isIconOnly
      >
        <FaRankingStar size={28} />
      </Button>
      <Button
        className={`bg-transparent w-full h-full col-span-1 [&>svg]:shrink-0 ${pathname === ROUTE.ME ? selectedStyle : notSelectedStyle}`}
        radius="none"
        as={Link}
        href={ROUTE.ME}
        isIconOnly
      >
        <FaUserCircle size={28} />
      </Button>
    </div>
  );
}
