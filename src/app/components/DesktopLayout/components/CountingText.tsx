'use client';
import { useEffect, useState } from 'react';

interface Props {
  startText: string;
  amount: number;
  duration?: number;
  endText?: string;
}

export default function CountingText({
  startText,
  endText,
  amount,
  duration = 2000,
}: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = 0;
    const animate = (timestamp: DOMHighResTimeStamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * amount));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [amount, duration]);

  return (
    <div className="w-full text-right">
      <span className="font-pretendard text-gray-800 text-4xl mr-4">
        {startText}
      </span>
      <span className="font-pretendard text-gray-800 text-4xl">
        {count.toLocaleString()}
      </span>
      <span className="font-pretendard text-gray-800 text-4xl">{endText}</span>
    </div>
  );
}
