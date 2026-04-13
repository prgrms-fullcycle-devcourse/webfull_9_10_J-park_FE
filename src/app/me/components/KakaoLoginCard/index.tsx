'use client';

import { Button } from '@heroui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';

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
        className="bg-primary text-white font-bold h-8 px-4 text-xs shadow-sm shadow-primary/20"
        onPress={handleKakaoLogin}
        startContent={<RiKakaoTalkFill size={14} />}
      >
        연동하기
      </Button>
    </div>
  );
}
