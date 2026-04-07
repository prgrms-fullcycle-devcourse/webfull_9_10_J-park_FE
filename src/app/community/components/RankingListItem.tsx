'use client';

import { Avatar } from '@heroui/react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { RankingItem } from '@/types/user';
import { formatMilliseconds } from '@/lib/utils';

interface Props {
  item: RankingItem;
  isMyRank: boolean;
  myTotalTime: number;
  prevTotalTime: number | null;
}

export default function RankingListItem({
  item,
  isMyRank,
  myTotalTime,
  prevTotalTime,
}: Props) {
  const renderRankIcon = (rank: number) => {
    if (rank === 1)
      return <FaTrophy className="text-2xl text-yellow-400 drop-shadow-sm" />;
    if (rank === 2)
      return <FaMedal className="text-2xl text-gray-400 drop-shadow-sm" />;
    if (rank === 3)
      return <FaMedal className="text-2xl text-amber-600 drop-shadow-sm" />;
    return;
  };

  const formattedItemTime = (() => {
    const timeString = formatMilliseconds(item.totalTime);
    const [hours, minutes] = timeString.split(':').map(Number);

    const parts = [];
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);

    return parts.length > 0 ? parts.join(' ') : '0분';
  })();

  const diffString = (() => {
    if (prevTotalTime === null) return null;

    const timeDiffMS = prevTotalTime - item.totalTime;
    const timeString = formatMilliseconds(timeDiffMS);
    const [hours, minutes] = timeString.split(':').map(Number);

    if (hours === 0 && minutes === 0) return null;

    const parts = [];
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);

    return parts.join(' ');
  })();

  return (
    <div
      className={`flex items-center gap-3 px-6 py-2 ${isMyRank ? 'bg-slate-50' : 'bg-white'}`}
    >
      <span className="text-primary font-black text-base">{item.rank}위</span>
      <Avatar
        src={item.profileImageUrl || undefined}
        className="w-9 h-9 bg-gray-100 "
      />

      <span className="flex-1 min-w-0">
        <p className="font-black text-xl w-full truncate">{item.nickname}</p>

        <div className="flex items-center mt-0.5">
          <small className="text-gray-600">{formattedItemTime}</small>

          {diffString && (
            <span className="ml-2 inline-flex items-center gap-0.5 bg-red-50 text-red-500 px-1.5 py-0.5 rounded-md text-[11px] font-bold tracking-tight">
              <span className="text-[9px]">▲</span> {diffString} 차이
            </span>
          )}
        </div>
      </span>

      {renderRankIcon(item.rank)}
    </div>
  );
}
