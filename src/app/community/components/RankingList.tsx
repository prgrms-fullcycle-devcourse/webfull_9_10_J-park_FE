'use client';

import { Spinner } from '@heroui/react';
import { RankingItem } from '@/types/user';

import RankingListItem from './RankingListItem';

interface Props {
  status: 'pending' | 'error' | 'success';
  allRanks: RankingItem[];
  myTotalTime: number;
  myRanking: number | null;
  bottomRef: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
}

export default function RankingList({
  status,
  allRanks,
  myRanking,
  myTotalTime,
  bottomRef,
  isFetchingNextPage,
}: Props) {
  if (status === 'pending') {
    return null;
  }

  if (status === 'error') {
    return (
      <div className="flex justify-center items-center py-10 text-red-500 font-bold">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="animate-fadeIn rounded-t-2xl w-full min-h-dvh bg-white z-20 pt-6">
      <small className="text-gray-600 p-6">공부시간 랭킹</small>
      {allRanks.map((item, index) => {
        const prevTotalTime = index > 0 ? allRanks[index - 1].totalTime : null;
        return (
          <RankingListItem
            key={`rank-${item.rank}-${index}`}
            item={item}
            myTotalTime={myTotalTime}
            prevTotalTime={prevTotalTime}
            isMyRank={item.rank === myRanking}
          />
        );
      })}

      <div
        ref={bottomRef}
        className="h-10 flex justify-center items-center mt-4"
      >
        {isFetchingNextPage && <Spinner color="warning" size="sm" />}
      </div>
    </div>
  );
}
