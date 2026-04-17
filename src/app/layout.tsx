import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import './globals.css';
import NavigationBar from '@/components/navigationBar';
import FloatingTimer from '@/components/FloatingTimer';
import DesktopLayout from './components/DesktopLayout';

export const metadata: Metadata = {
  title: '등불:작은 공부 비서',
  description: '일정을 미루는 것을 막고 동기를 부여해주는 작은 비서',
  openGraph: {
    title: '등불',
    description: '목표 달성을 도와주는 앱',
    url: process.env.NEXT_PUBLIC_API_URL,
    siteName: '등불',
    images: [
      {
        url: '/lamp.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: '/logo-all.svg',
    apple: '/logo-all.svg',
  },
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
