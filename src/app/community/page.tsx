'use client';

import { useEffect, useMemo } from 'react';
import { Avatar, Spinner } from '@heroui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { FaCrown, FaTrophy, FaMedal } from 'react-icons/fa';

const fetchMockRankings = async ({ pageParam = 1 }) => {
  const limit = 30;
  const startRank = (pageParam - 1) * limit + 1;
  const maxUsers = 150;
  const endRank = Math.min(pageParam * limit, maxUsers);

  const mockRanks = Array.from({ length: endRank - startRank + 1 }, (_, i) => {
    const currentRank = startRank + i;
    return {
      rank: currentRank,
      userId: currentRank,
      nickname: `유저 ${currentRank}`,
      profileImage: null,
      totalTime: `0${Math.max(0, 5 - Math.floor(currentRank / 20))}:43:30`,
    };
  });

  return {
    success: true,
    data: {
      myRanking: 12,
      ranks: mockRanks,
      nextPage: endRank < maxUsers ? pageParam + 1 : undefined,
    },
  };
};

export default function RankingPage() {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['dummyRankings'],
      queryFn: fetchMockRankings,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.data.nextPage,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allRanks = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.ranks) || [];
  }, [data]);

  const myRanking = data?.pages[0]?.data?.myRanking || null;

  const myRankData = useMemo(() => {
    if (!myRanking) return null;
    return (
      allRanks.find((r) => r.rank === myRanking) || {
        rank: myRanking,
        nickname: '내 닉네임',
        profileImage: null,
        totalTime: '00:00:00',
      }
    );
  }, [allRanks, myRanking]);

  const renderRankIcon = (rank: number) => {
    if (rank === 1)
      return <FaTrophy className="text-4xl text-yellow-400 drop-shadow-md" />;
    if (rank === 2)
      return <FaMedal className="text-4xl text-gray-400 drop-shadow-md" />;
    if (rank === 3)
      return <FaMedal className="text-4xl text-amber-600 drop-shadow-md" />;
    return (
      <span className="text-xl font-bold text-black w-8 text-center">
        {rank}등
      </span>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden relative">
      <div className="shrink-0 flex flex-col items-center justify-center py-10 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-black flex items-center gap-3">
          <FaCrown className="text-5xl text-yellow-400 drop-shadow-lg" />
          오늘의 공부시간 순위
        </h1>
      </div>

      <div className="flex-1 w-full overflow-y-auto scrollbar-hide pb-4">
        {status === 'pending' ? (
          <div className="flex justify-center items-center py-10">
            <Spinner color="warning" size="lg" />
          </div>
        ) : status === 'error' ? (
          <div className="flex justify-center items-center py-10 text-red-500 font-bold">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : (
          <>
            {allRanks.map((item) => {
              const isMyRank = item.rank === myRanking;
              return (
                <div
                  key={item.userId}
                  className={`flex items-center gap-4 py-4 px-6 border-b border-gray-200 transition-colors ${
                    isMyRank ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 w-16">
                    <Avatar className="w-12 h-12 text-large bg-gray-100 border border-gray-300" />
                  </div>

                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex justify-center items-center w-10">
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
            })}

            <div
              ref={ref}
              className="h-10 flex justify-center items-center mt-4"
            >
              {isFetchingNextPage && <Spinner color="warning" size="sm" />}
            </div>
          </>
        )}
      </div>

      {myRankData && (
        <div className="shrink-0 w-full bg-gray-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] relative z-40">
          <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-extrabold px-3 py-1 rounded-br-lg z-50">
            내 순위
          </div>

          <div className="flex items-center gap-4 py-4 px-6 mt-2">
            <div className="flex flex-col items-center gap-1 w-16">
              <Avatar
                src={myRankData.profileImage || undefined}
                fallback={
                  <span className="text-[10px] text-gray-400">프로필</span>
                }
                className="w-12 h-12 text-large bg-gray-600 border border-gray-500"
              />
            </div>

            <div className="flex-1 flex items-center gap-3">
              <div className="flex justify-center items-center w-10">
                <span className="text-xl font-bold text-yellow-400 w-8 text-center">
                  {myRankData.rank}등
                </span>
              </div>
              <span className="text-lg font-extrabold text-white">
                {myRankData.nickname}
              </span>
            </div>

            <span className="text-lg text-gray-200 font-medium tracking-wide">
              {myRankData.totalTime}
            </span>
          </div>
        </div>
      )}

      <div className="shrink-0 w-full h-[72px] bg-transparent pointer-events-none" />
    </div>
  );
}
