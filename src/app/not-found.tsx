'use client';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgSmileSad } from 'react-icons/cg';

export default function NotFound() {
  const router = useRouter();
  const [counter, setCounter] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter <= 0) {
        redirect('/');
      }
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter, setCounter, router]);
  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <CgSmileSad size={200} className="text-gray-400 mb-6" />
      <p className="font-bold text-2xl text-gray-400 mb-4">
        존재하지 않는 페이지에요!
      </p>
      <p className="text-gray-400">
        <b>{counter}</b>초 후 홈으로 이동합니다
      </p>
    </div>
  );
}
