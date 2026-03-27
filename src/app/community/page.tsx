'use client';

import { useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RankingsResponse, MyProfileResponse } from '@/types/api';
import { formatMilliseconds } from '@/lib/utils';

import RankingHeader from './components/RankingHeader';
import RankingList from './components/RankingList';
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

    const me = profileData?.data;

    if (!me) {
      return {
        rank: myRanking,
        nickname: '데이터 확인 중...',
        profileImage: null,
        totalTime: '00:00:00',
      };
    }

    return {
      rank: myRanking,
      nickname: me.nickname ? String(me.nickname) : '이름 없음',
      profileImage: me.profileImageUrl || null,
      totalTime: me.totalTime
        ? formatMilliseconds(Number(me.totalTime))
        : '00:00:00',
    };
  }, [myRanking, profileData]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white relative">
      <RankingHeader />

      <RankingList
        status={rankingStatus}
        allRanks={allRanks}
        myRanking={myRanking}
        bottomRef={ref}
        isFetchingNextPage={isFetchingNextPage}
      />

      <MyRankingBar myRankData={myRankData} />
    </div>
  );
}
