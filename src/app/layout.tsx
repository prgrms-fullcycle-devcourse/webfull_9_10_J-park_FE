import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import './globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Next.js 기반 프로젝트 템플릿',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

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
            children
          ) : (
            <div className="flex flex-row ">
              <div className="flex flex-col p-6 gap-3 max-w-[430px] content-center align-middle justify-center">
                <h1 className="text-6xl">
                  <b>등불</b> | 발등에 불
                </h1>
                <p className="text-2xl text-gray-500">
                  일정을 미루는 것을 막고 동기를 부여해주는 작은 비서!
                </p>
                <div className="text-gray-500">
                  <p className="text-right font-extrabold">J-park</p>
                  <p className="text-right">애리, 장현, 상호, 영식, 중훈</p>
                </div>
              </div>
              {children}
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
