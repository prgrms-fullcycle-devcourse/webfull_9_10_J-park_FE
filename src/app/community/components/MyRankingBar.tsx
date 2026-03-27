import { Avatar } from '@heroui/react';

interface MyRankData {
  rank: number;
  nickname: string;
  profileImageUrl: string | null;
  totalTime: string;
}

interface Props {
  myRankData: MyRankData | null;
}

export default function MyRankingBar({ myRankData }: Props) {
  if (!myRankData) return null;

  return (
    <div className="sticky bottom-[72px] mt-auto w-full bg-gray-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] z-40">
      <div className="absolute top-0 left-0 bg-yellow-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-br-lg z-50">
        내 순위
      </div>

      <div className="flex items-center gap-3 py-4 px-6">
        <div className="flex-shrink-0">
          <Avatar
            src={myRankData.profileImageUrl || undefined}
            className="w-11 h-11 bg-gray-600 border border-gray-500"
          />
        </div>

        <div className="w-16 flex-shrink-0 text-center">
          <span className="text-lg font-bold text-yellow-400">
            {myRankData.rank}등
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-base font-extrabold text-white truncate">
            {myRankData.nickname}
          </p>
        </div>

        <div className="flex-shrink-0 ml-2">
          <span className="text-lg text-gray-200 font-medium tracking-tight">
            {myRankData.totalTime}
          </span>
        </div>
      </div>
    </div>
  );
}
