import NavigationBar from '@/components/navigationBar';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

const mobileClasses =
  'flex max-w-dvw min-w-dvw max-h-dvh min-h-dvh flex-col overflow-y-auto scrollbar-hide bg-amber-200';
const desktopClasses =
  'relative flex max-w-[430px] min-w-[430px] max-h-[932px] min-h-[430px] rounded-2xl flex-col overflow-y-auto scrollbar-hide bg-amber-200';

export default async function Home() {
  const headerList = await headers();
  const ua = userAgent({ headers: headerList });
  const isMobile = ua.device.type === 'mobile';

  return (
    <main className={isMobile ? mobileClasses : desktopClasses}>
      {/* 
        오버플로우 착각하지 않기 위해 넣어둔 요소입니다. 
        삭제 후 작업하기
      */}
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <div>hellow</div>
      <NavigationBar />
    </main>
  );
}
