'use client';
import { formatMilliseconds } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
  initialTimeMS?: number;
  isMinimized?: boolean;
}

export default function Timer({ initialTimeMS = 0, isMinimized }: Props) {
  const [time, setTime] = useState(initialTimeMS);

  useEffect(() => {
    const startTimestamp = Date.now() - initialTimeMS;

    const interval = setInterval(() => {
      setTime(Date.now() - startTimestamp);
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTimeMS]);

  return (
    <div
      className={`col-span-1 justify-center 
    items-center font-bold z-20 rounded-l-2xl text-success-400
    ${isMinimized ? 'text-sm' : 'text-2xl'}
    `}
    >
      {formatMilliseconds(time)}
    </div>
  );
}
