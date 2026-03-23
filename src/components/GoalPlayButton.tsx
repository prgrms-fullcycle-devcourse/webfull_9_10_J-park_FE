'use client';

import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';

interface GoalPlayButtonProps {
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function GoalPlayButton({
  isPlaying,
  onClick,
}: GoalPlayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${
        isPlaying
          ? 'bg-orange-500 hover:bg-orange-600'
          : 'bg-red-500 hover:bg-red-600'
      }`}
    >
      {isPlaying ? (
        <IoPauseSharp size={22} className="text-white" />
      ) : (
        <IoPlaySharp size={22} className="text-white" />
      )}
    </button>
  );
}
