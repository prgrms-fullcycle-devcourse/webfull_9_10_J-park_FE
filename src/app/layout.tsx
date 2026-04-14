import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import './globals.css';
import NavigationBar from '@/components/navigationBar';
import FloatingTimer from '@/components/FloatingTimer';
import DesktopLayout from './components/DesktopLayout';

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body
        className={`font-notosan antialiased animate-bgCycle ${isMobile ? '' : 'bg-linear-to-r from-rose-100 via-indigo-200 to-teal-100 bg-[length:200%_200%]'}`}
      >
        <Providers>
          {isMobile ? (
            <div className={mobileClasses}>
              <FloatingTimer />
              <main className={`overflow-y-auto scrollbar-hide`}>
                {children}
              </main>
              <NavigationBar />
            </div>
          ) : (
            <DesktopLayout>{children}</DesktopLayout>
          )}
        </Providers>
      </body>
    </html>
  );
}
