import { Avatar } from '@heroui/react';

interface MyRankData {
  rank: number;
  nickname: string;
  profileImage: string | null;
  totalTime: string;
}

interface Props {
  myRankData: MyRankData | null;
}

export default function MyRankingBar({ myRankData }: Props) {
  if (!myRankData) return null; // 데이터가 없으면 아무것도 안 그립니다!

  return (
    <div className="sticky bottom-[72px] mt-auto w-full bg-gray-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] z-40">
      <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-extrabold px-3 py-1 rounded-br-lg z-50">
        내 순위
      </div>

      <div className="flex items-center gap-4 py-4 px-6 mt-2">
        <div className="flex flex-col items-center gap-1 w-16">
          <Avatar
            src={myRankData.profileImage || undefined}
            className="w-12 h-12 text-large bg-gray-600 border border-gray-500"
          />
        </div>

        <div className="flex-1 flex items-center gap-3">
          <div className="flex justify-center items-center w-10">
            <span className="text-xl font-bold text-yellow-400 w-20 text-center">
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
  );
}
