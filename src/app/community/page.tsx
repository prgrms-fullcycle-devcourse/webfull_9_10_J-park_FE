'use client';

import { useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RankingsResponse, MyProfileResponse } from '@/types/user';

import RankingList from './components/RankingList';

import { api } from '@/lib/axios';
import { formatStudyTime } from '@/lib/utils';
import { Avatar } from '@heroui/react';

const fetchRankings = async ({
  pageParam = 1,
}): Promise<RankingsResponse & { nextPage?: number }> => {
  const response = await api.get<RankingsResponse>(
    `rankings?page=${pageParam}&limit=30`,
  );
  if (!response.success)
    throw new Error('랭킹 데이터를 불러오는데 실패했습니다.');

  const ranksArray = response.data.ranks || [];
  const hasNext = ranksArray.length === 30;

  return { ...response, nextPage: hasNext ? pageParam + 1 : undefined };
};

const fetchMyProfile = async (): Promise<MyProfileResponse> => {
  return api.get<MyProfileResponse>('/users/me');
};

export default function RankingPage() {
  const { ref, inView } = useInView({ threshold: 0.1 });

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
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 100);
      return () => clearTimeout(timer);
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
      return (rawRanking as any).myRanking || null;
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
        profileImageUrl: null,
        totalTime: 0,
      };
    }

    return {
      rank: myRanking,
      nickname: me.nickname ? String(me.nickname) : '이름 없음',
      profileImageUrl: me.profileImageUrl || null,
      totalTime: me.totalTime ? Number(me.totalTime) : 0,
    };
  }, [myRanking, profileData]);

  return (
    <div className="relative flex flex-col gap-4 bg-slate-50 overflow-auto scrollbar-hide min-h-screen max-h-screen">
      {myRankData && (
        <div className="animate-fadeIn sticky top-0 p-6 pb-0 bg-slate-50 z-30 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              radius="full"
              src={myRankData.profileImageUrl || undefined}
              className="p-0 hover:cursor-default w-16 h-16 bg-gray-200"
            />
            <span className="text-2xl font-bold text-gray-900">
              {myRankData.nickname}
            </span>
          </div>
          <div className="flex w-full justify-between items-end">
            <div>
              <p className="font-black text-2xl text-gray-900 -mb-1">
                {formatStudyTime(myRankData.totalTime)}
              </p>
              <span className="text-blue-500 font-bold text-lg">
                내가 공부한 시간
              </span>
            </div>
            <div className="text-right">
              <p className="truncate font-black text-4xl -mb-1">
                {myRankData.rank}위
              </p>
            </div>
          </div>
        </div>
      )}
      {myRankData && (
        <RankingList
          status={rankingStatus}
          allRanks={allRanks}
          myRanking={myRanking}
          myTotalTime={myRankData.totalTime}
          bottomRef={ref}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
