import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import './globals.css';
import NavigationBar from '@/components/navigationBar';
import { STYLE } from '@/constants';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Next.js 기반 프로젝트 템플릿',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const mobileClasses =
  'relative flex w-dvw max-h-dvh min-h-dvh rounded-2xl flex-col';
const desktopClasses =
  'relative flex w-[430px] min-h-dvh max-h-dvh rounded-2xl flex-col shadow-2xl';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const ua = userAgent({ headers: headerList });
  const isMobile = ua.device.type === 'mobile';

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-notosan antialiased">
        <Providers>
          {isMobile ? (
            <div className={mobileClasses}>
              <main className={`overflow-y-auto scrollbar-hide`}>
                {children}
                <div style={{ minHeight: STYLE.NAVBAR_HEIGHT }}></div>
              </main>
              <NavigationBar />
            </div>
          ) : (
            <div className="flex">
              <div className="flex flex-col p-6 gap-3 max-w-[430px] max-h-dvh content-center align-middle justify-center">
                <h1 className="text-6xl">
                  <b className="text-success">등불</b> <b>|</b> 발등에 불
                </h1>
                <p className="text-2xl text-gray-500">
                  일정을 미루는 것을 막고 동기를 부여해주는 작은 비서!
                </p>
                <div className="text-gray-500">
                  <p className="text-right font-extrabold">J-park</p>
                  <p className="text-right">애리, 장현, 상호, 영식, 중훈</p>
                </div>
              </div>
              <div className={desktopClasses}>
                <main className={`overflow-y-auto scrollbar-hide`}>
                  {children}
                  <div style={{ minHeight: STYLE.NAVBAR_HEIGHT }}></div>
                </main>
                <NavigationBar />
              </div>
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
