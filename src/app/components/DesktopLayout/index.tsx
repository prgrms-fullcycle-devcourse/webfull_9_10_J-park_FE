'use client';
import FloatingTimer from '@/components/FloatingTimer';
import NavigationBar from '@/components/navigationBar';

export default function DesktopLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-16">
      <div className="flex flex-col p-6 gap-3 max-w-[430px] max-h-dvh content-center align-middle justify-center">
        <h1 className="font-bold text-4xl">모든 목표 계획은</h1>
        <h1 className="font-bold text-4xl">
          <span>등불</span>에서 미루지 않고, 쉽게
        </h1>
        <p className="text-2xl text-gray-600">
          일정을 미루는 것을 막고 동기를 부여해주는 작은 비서
        </p>
      </div>

      <div className="relative flex min-w-[400px] max-w-[400px] h-dvh max-h-[850px] m-auto flex-col shadow-2xl rounded-4xl bg-white overflow-hidden">
        <FloatingTimer />
        <main className="overflow-y-auto scrollbar-hide">{children}</main>
        <NavigationBar />
      </div>
    </div>
  );
}
