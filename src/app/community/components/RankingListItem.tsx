'use client';

import { Avatar } from '@heroui/react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { RankingItem } from '@/types/api';

interface Props {
  item: RankingItem;
  isMyRank: boolean;
}

export default function RankingListItem({ item, isMyRank }: Props) {
  const renderRankIcon = (rank: number) => {
    if (rank === 1)
      return <FaTrophy className="text-3xl text-yellow-400 drop-shadow-md" />;
    if (rank === 2)
      return <FaMedal className="text-3xl text-gray-400 drop-shadow-md" />;
    if (rank === 3)
      return <FaMedal className="text-3xl text-amber-600 drop-shadow-md" />;
    return (
      <span className="text-lg font-bold text-black text-center">{rank}등</span>
    );
  };

  return (
    <div
      className={`flex items-center gap-3 py-4 px-4 sm:px-6 border-b border-gray-200 transition-colors ${
        isMyRank ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex-shrink-0">
        <Avatar
          src={item.profileImage || undefined}
          className="w-10 h-10 sm:w-12 sm:h-12 text-large bg-gray-100 border border-gray-300"
        />
      </div>

      <div className="flex-shrink-0 w-12 flex justify-center items-center">
        {renderRankIcon(item.rank)}
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-base sm:text-lg font-extrabold text-black block truncate">
          {item.nickname}
        </span>
      </div>

      <div className="flex-shrink-0 ml-2">
        <span className="text-base sm:text-lg text-gray-800 font-medium tracking-wide whitespace-nowrap">
          {item.totalTime}
        </span>
      </div>
    </div>
  );
}
