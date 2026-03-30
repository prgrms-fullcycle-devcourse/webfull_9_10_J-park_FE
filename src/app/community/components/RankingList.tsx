'use client';

import { Spinner } from '@heroui/react';
import { RankingItem } from '@/types/user';
import { formatMilliseconds } from '@/lib/utils';
import RankingListItem from './RankingListItem';
import RankingListSkeleton from './RankingListSkeleton';

interface Props {
  status: 'pending' | 'error' | 'success';
  allRanks: RankingItem[];
  myRanking: number | null;
  bottomRef: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
}

export default function RankingList({
  status,
  allRanks,
  myRanking,
  bottomRef,
  isFetchingNextPage,
}: Props) {
  // if (true) {
  if (status === 'pending') {
    return <RankingListSkeleton />;
  }

  if (status === 'error') {
    return (
      <div className="flex justify-center items-center py-10 text-red-500 font-bold">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-[30px]">
      {allRanks.map((item, index) => {
        const safeTime = !item.totalTime
          ? '00:00:00'
          : String(item.totalTime).includes(':')
            ? String(item.totalTime)
            : formatMilliseconds(Number(item.totalTime));

        return (
          <RankingListItem
            key={`rank-${item.rank}-${index}`}
            item={{
              ...item,
              totalTime: safeTime,
            }}
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
