'use client';

import { useEffect, useMemo } from 'react';
import { Spinner } from '@heroui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RankingsResponse, MyProfileResponse } from '@/types/api';
import { formatMilliseconds } from '@/lib/utils';
import RankingHeader from './components/RankingHeader';
import RankingListItem from './components/RankingListItem';
import MyRankingBar from './components/MyRankingBar';

const fetchRankings = async ({
  pageParam = 1,
}): Promise<RankingsResponse & { nextPage?: number }> => {
  const response = await fetch(
    `https://lampfire-backend.onrender.com/rankings?page=${pageParam}&limit=30`,
    {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (!response.ok) throw new Error('랭킹 데이터를 불러오는데 실패했습니다.');

  const result = await response.json();
  const ranksArray = result.data.ranks || [];
  const hasNext = ranksArray.length === 30;

  return { ...result, nextPage: hasNext ? pageParam + 1 : undefined };
};

const fetchMyProfile = async (): Promise<MyProfileResponse> => {
  const response = await fetch(
    'https://lampfire-backend.onrender.com/users/me',
    {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (!response.ok) throw new Error('내 정보를 불러오는데 실패했습니다.');
  return await response.json();
};

export default function RankingPage() {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const {
    data: rankingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: rankingStatus,
  } = useInfiniteQuery({
    queryKey: ['realRankings'],
    queryFn: fetchRankings,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { data: profileData } = useQuery({
    queryKey: ['myProfile'],
    queryFn: fetchMyProfile,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allRanks = useMemo(
    () => rankingData?.pages.flatMap((page) => page.data.ranks) || [],
    [rankingData],
  );

  const myRanking = useMemo(() => {
    const rawRanking = rankingData?.pages[0]?.data?.myRanking;
    if (!rawRanking) return null;
    if (typeof rawRanking === 'object') {
      return (rawRanking as any).myRanking || (rawRanking as any).rank || null;
    }
    return rawRanking;
  }, [rankingData]);

  const myRankData = useMemo(() => {
    if (!myRanking) return null;

    const foundMeInRanks = allRanks.find((item) => item.rank === myRanking);
    if (foundMeInRanks) return foundMeInRanks;

    const me = profileData?.data;

    return {
      rank: myRanking,
      nickname: me?.nickname ?? '이름 없음',
      profileImage: me?.profileImageUrl ?? null,
      totalTime: formatMilliseconds(me?.totalTime ?? 0),
    };
  }, [allRanks, myRanking, profileData]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white relative">
      <RankingHeader />

      <div className="flex flex-col w-full pb-[30px]">
        {rankingStatus === 'pending' ? (
          <div className="flex justify-center items-center py-10">
            <Spinner color="warning" size="lg" />
          </div>
        ) : rankingStatus === 'error' ? (
          <div className="flex justify-center items-center py-10 text-red-500 font-bold">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : (
          <>
            {allRanks.map((item, index) => (
              <RankingListItem
                key={`rank-${item.rank}-${index}`}
                item={item}
                isMyRank={item.rank === myRanking}
              />
            ))}

            <div
              ref={ref}
              className="h-10 flex justify-center items-center mt-4"
            >
              {isFetchingNextPage && <Spinner color="warning" size="sm" />}
            </div>
          </>
        )}
      </div>

      <MyRankingBar myRankData={myRankData} />
    </div>
  );
}
