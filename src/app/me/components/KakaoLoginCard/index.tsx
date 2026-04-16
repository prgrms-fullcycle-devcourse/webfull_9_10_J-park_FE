'use client';

import { Button } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface Props {
  isLoggedIn?: boolean;
  email?: string | null;
}

export default function KakaoLoginCard({ isLoggedIn = false, email }: Props) {
  const queryClient = useQueryClient();

  const handleKakaoLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    window.location.href = `${baseUrl}/users/kakao/start`;
  };

  const logoutMutation = useMutation({
    mutationFn: () => api.get('/users/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
    onError: () => {
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const KakaoIcon = () => (
    <svg
      width="24"
      height="24"
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
  );

  return (
    <div className="flex gap-4 items-center">
      <Button
        className="rounded-2xl p-0 hover:cursor-default bg-[#FEE500] shrink-0"
        isIconOnly
        disableAnimation
        disableRipple
      >
        <KakaoIcon />
      </Button>

      <div className="flex w-full justify-between items-center gap-2 overflow-hidden">
        {isLoggedIn ? (
          <>
            <div className="flex flex-col min-w-0">
              <small className="text-gray-600">연동된 카카오 아이디</small>
              <p className="truncate font-black text-base mt-0.5">
                {email || '이메일 정보 없음'}
              </p>
            </div>
            <Button
              size="sm"
              radius="full"
              className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-black/85 font-bold px-4 shrink-0 shadow-sm"
              isLoading={logoutMutation.isPending}
              onPress={() => logoutMutation.mutate()}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-col min-w-0">
              <small className="text-gray-600">카카오 계정 연동</small>
              <p className="truncate font-black text-base mt-0.5">
                내 계획을 안전하게 관리하세요
              </p>
            </div>
            <Button
              size="sm"
              radius="full"
              className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-black/85 font-bold px-4 shrink-0 shadow-sm"
              onPress={handleKakaoLogin}
            >
              연동하기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
