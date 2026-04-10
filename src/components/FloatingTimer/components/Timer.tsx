'use client';

import { formatMilliseconds } from '@/lib/utils';
import { useTimerStore } from '@/stores/useTimerStore';
import { useSyncedTime } from '@/hooks/useSyncedTime';

interface Props {
  initialTimeMS?: number;
  isMinimized?: boolean;
  goalId?: number;
}

export default function Timer({
  initialTimeMS = 0,
  isMinimized,
  goalId,
}: Props) {
  const { playingId, startTime, recordedTimes } = useTimerStore();
  const currentGlobalTime = useSyncedTime();

  const targetId = goalId || playingId;

  const isPlaying = playingId === targetId && targetId !== null;

  const baseTime =
    initialTimeMS + (targetId ? recordedTimes[targetId] || 0 : 0);

  const liveMs =
    isPlaying && startTime
      ? baseTime + (currentGlobalTime - startTime)
      : baseTime;

  return (
    <div className="col-span-1 justify-center items-center font-bold z-20 rounded-l-2xl text-success-400 text-lg">
      {formatMilliseconds(liveMs)}
    </div>
  );
}
