import { FaCrown } from 'react-icons/fa';

export default function RankingHeader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-black flex items-center gap-3">
        <FaCrown className="text-5xl text-yellow-400 drop-shadow-lg" />
        오늘의 공부시간 순위
      </h1>
    </div>
  );
}
