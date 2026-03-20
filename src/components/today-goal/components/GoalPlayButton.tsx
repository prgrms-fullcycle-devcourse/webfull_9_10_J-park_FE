'use client';

import { useState } from 'react';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';

export default function GoalPlayButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlayPause}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
    >
      {isPlaying ? (
        <IoPauseSharp size={22} className="text-white" />
      ) : (
        <IoPlaySharp size={22} className="text-white" />
      )}
    </button>
  );
}
