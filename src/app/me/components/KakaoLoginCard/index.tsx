'use client';

import { Button } from '@heroui/react';

export default function KakaoLoginCard() {
  const handleKakaoLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    window.location.href = `${baseUrl}/users/kakao/start`;
  };

  return (
    <div className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-xl p-3 px-4">
      <span className="text-sm text-primary/70 font-bold tracking-tight">
        내 계획을 안전하게 관리하세요
      </span>
      <Button
        size="sm"
        radius="full"
        className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-black/85 font-bold h-8 px-4 text-xs shadow-sm"
        onPress={handleKakaoLogin}
        disableRipple
        startContent={
          <svg
            width="14"
            height="14"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 2C4.029 2 0 4.673 0 7.973C0 10.154 1.517 12.062 3.861 13.097L3.033 16.14C2.96 16.411 3.25 16.63 3.491 16.471L7.151 13.988C7.75 14.07 8.368 14.116 9 14.116C13.971 14.116 18 11.443 18 8.143C18 4.843 13.971 2 9 2Z"
              fill="#000000"
            />
          </svg>
        }
      >
        연동하기
      </Button>
    </div>
  );
}
