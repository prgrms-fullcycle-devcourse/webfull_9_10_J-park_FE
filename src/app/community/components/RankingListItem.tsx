'use client';

import { Avatar } from '@heroui/react';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { RankingItem } from '@/types/user';

interface Props {
  item: RankingItem;
  isMyRank: boolean;
  myTotalTime: number;
}

export default function RankingListItem({
  item,
  isMyRank,
  myTotalTime,
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
  const timeDiffMS = item.totalTime - myTotalTime;
  const itemTimeHours = Math.round(item.totalTime / 60 / 60).toLocaleString();
  const diffHours = Math.round(timeDiffMS / 60 / 60);

  return (
    <div
      className={`flex items-center gap-3 px-6 py-2 ${isMyRank ? 'bg-slate-50' : 'bg-white'}`}
    >
      <small className="text-primary font-black">{item.rank}위</small>
      <Avatar
        src={item.profileImageUrl || undefined}
        className="w-9 h-9 bg-gray-100 "
      />

      <span className="flex-1 min-w-0">
        <p className="font-black text-xl w-full truncate">{item.nickname}</p>
        <small className="text-gray-600">
          {itemTimeHours}시간{' '}
          {timeDiffMS > 0 ? (
            <span className="text-danger">
              -{diffHours.toLocaleString()}시간
            </span>
          ) : (
            <span className="text-primary">
              +{Math.abs(diffHours).toLocaleString()}시간
            </span>
          )}
        </small>
      </span>

      {renderRankIcon(item.rank)}
    </div>
  );
}
