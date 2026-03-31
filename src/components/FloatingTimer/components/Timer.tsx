import { formatMilliseconds } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
  initialTimeMS?: number;
  isMinimized?: boolean;
}
export default function Timer({ initialTimeMS, isMinimized }: Props) {
  const [time, setTime] = useState(() => initialTimeMS || 0);

  useEffect(() => {
    if (initialTimeMS) {
      setTime(initialTimeMS);
    }
  }, [initialTimeMS]);

  useEffect(() => {
    const interval = setInterval(() => setTime(time + 1000), 1000);
    return () => clearInterval(interval);
  }, [time]);

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
