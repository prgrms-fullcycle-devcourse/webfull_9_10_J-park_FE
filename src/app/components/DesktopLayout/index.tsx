'use client';
import FloatingTimer from '@/components/FloatingTimer';
import NavigationBar from '@/components/navigationBar';
import Stats from './components/Stats';
import Description from './components/Description';
import { useEffect, useState } from 'react';
import Logo from './components/Logo';

export default function DesktopLayout({ children }: React.PropsWithChildren) {
  const contents = [
    <Logo key="logo" />,
    <Description key="description" />,
    <Stats key="stats" />,
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % contents.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex gap-16">
      {contents[index]}
      <div className="relative flex min-w-[400px] max-w-[400px] h-dvh max-h-[850px] m-auto flex-col shadow-2xl rounded-4xl bg-white overflow-hidden">
        <FloatingTimer />
        <main className="overflow-y-auto scrollbar-hide">{children}</main>
        <NavigationBar />
      </div>
    </div>
  );
}
