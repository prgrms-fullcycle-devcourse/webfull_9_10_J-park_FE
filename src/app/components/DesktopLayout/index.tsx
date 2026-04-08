import FloatingTimer from '@/components/FloatingTimer';
import NavigationBar from '@/components/navigationBar';

export default function DesktopLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex ">
      <div className="flex flex-col p-6 gap-3 max-w-[430px] max-h-dvh content-center align-middle justify-center">
        <h1 className="text-6xl">
          <b className="text-success">등불</b> <b>|</b> 발등에 불
        </h1>
        <p className="text-2xl text-gray-500">
          일정을 미루는 것을 막고 동기를 부여해주는 작은 비서!
        </p>
        <div className="text-gray-500">
          <p className="text-right font-extrabold">J-park</p>
          <p className="text-right">애리, 정현, 상호, 영식, 중훈</p>
        </div>
      </div>

      <div className="relative flex min-w-[400px] max-w-[400px] h-dvh max-h-[930px] m-auto flex-col shadow-2xl rounded-4xl overflow-hidden">
        <FloatingTimer />
        <main className="overflow-y-auto scrollbar-hide">{children}</main>
        <NavigationBar />
      </div>
    </div>
  );
}
