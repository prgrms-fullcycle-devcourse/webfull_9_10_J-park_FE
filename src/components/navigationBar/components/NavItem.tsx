'use client';
import { Button, Link } from '@heroui/react';
import { LuListTodo } from 'react-icons/lu';
import { AiFillHome } from 'react-icons/ai';
import { FaRankingStar } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';

type NavButtonType = 'home' | 'goals' | 'community' | 'profile';

interface Props {
  type: NavButtonType;
  size?: number;
  href?: string;
}

export default function NavItem({ type, size = 28, href = '' }: Props) {
  return (
    <Button className="bg-transparent" as={Link} href={href} isIconOnly>
      {type === 'home' && <AiFillHome size={size} />}
      {type === 'goals' && <LuListTodo size={size} />}
      {type === 'community' && <FaRankingStar size={size} />}
      {type === 'profile' && <FaUserCircle size={size} />}
    </Button>
  );
}
