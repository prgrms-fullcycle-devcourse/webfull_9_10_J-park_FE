'use client';

import { useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RankingsResponse, MyProfileResponse, Ranking } from '@/types/user';
import { formatMilliseconds } from '@/lib/utils';

import RankingHeader from './components/RankingHeader';
import RankingList from './components/RankingList';
import MyRankingBar from './components/MyRankingBar';
import { api } from '@/lib/axios';
import { FcSurvey } from 'react-icons/fc';
import { Avatar, Button } from '@heroui/react';

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
      return (rawRanking as Ranking).myRanking || null;
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
      totalTime: me.totalTime ? Math.round(Number(me.totalTime) / 60 / 60) : 0,
    };
  }, [myRanking, profileData]);

  return (
    <div className="relative flex flex-col gap-4 bg-slate-50 overflow-auto scrollbar-hide max-h-screen">
      <div className="sticky top-0 p-6 pb-0">
        <Avatar
          radius="full"
          className="p-0 hover:cursor-default w-16 h-16 mb-4"
        />
        <div className="flex w-full justify-between">
          <div>
            <p className="font-black text-xl -mb-2">
              {myRankData?.totalTime}시간
            </p>
            <small className="text-gray-600">내가 공부한 시간</small>
          </div>
          <div className="text-right">
            <p className="truncate font-black text-2xl -mb-2">
              {myRankData?.rank}위
            </p>
          </div>
        </div>
      </div>
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

      {/* <MyRankingBar myRankData={myRankData} /> */}
    </div>
  );
}
