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
      return <FaTrophy className="text-4xl text-yellow-400 drop-shadow-md" />;
    if (rank === 2)
      return <FaMedal className="text-4xl text-gray-400 drop-shadow-md" />;
    if (rank === 3)
      return <FaMedal className="text-4xl text-amber-600 drop-shadow-md" />;
    return (
      <span className="text-xl font-bold text-black w-20 text-center">
        {rank}등
      </span>
    );
  };

  return (
    <div
      className={`flex items-center gap-4 py-4 px-6 border-b border-gray-200 transition-colors ${
        isMyRank ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex flex-col items-center gap-1 w-16">
        <Avatar
          src={item.profileImage || undefined}
          className="w-12 h-12 text-large bg-gray-100 border border-gray-300"
        />
      </div>

      <div className="flex-1 flex items-center gap-3">
        <div className="flex justify-center items-center w-20">
          {renderRankIcon(item.rank)}
        </div>
        <span className="text-lg font-extrabold text-black">
          {item.nickname}
        </span>
      </div>

      <span className="text-lg text-gray-800 font-medium tracking-wide">
        {item.totalTime}
      </span>
    </div>
  );
}
