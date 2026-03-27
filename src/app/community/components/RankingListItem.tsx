'use client';

import { Avatar } from '@heroui/react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { RankingItem } from '@/types/user';

interface Props {
  item: RankingItem;
  isMyRank: boolean;
}

export default function RankingListItem({ item, isMyRank }: Props) {
  const renderRankIcon = (rank: number) => {
    if (rank === 1)
      return <FaTrophy className="text-2xl text-yellow-400 drop-shadow-sm" />;
    if (rank === 2)
      return <FaMedal className="text-2xl text-gray-400 drop-shadow-sm" />;
    if (rank === 3)
      return <FaMedal className="text-2xl text-amber-600 drop-shadow-sm" />;

    return (
      <span className="text-base font-bold text-gray-700 whitespace-nowrap">
        {rank}등
      </span>
    );
  };

  return (
    <div
      className={`flex items-center gap-3 py-3 px-5 border-b border-gray-100 transition-colors ${
        isMyRank ? 'bg-blue-50/50' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex-shrink-0">
        <Avatar
          src={item.profileImageUrl || undefined}
          className="w-9 h-9 bg-gray-100 border border-gray-200"
        />
      </div>

      <div className="flex-shrink-0 w-14 flex justify-center items-center">
        {renderRankIcon(item.rank)}
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-base font-bold text-gray-900 block truncate">
          {item.nickname}
        </span>
      </div>

      <div className="flex-shrink-0 ml-1">
        <span className="text-base text-gray-600 font-semibold tracking-tight">
          {item.totalTime}
        </span>
      </div>
    </div>
  );
}
