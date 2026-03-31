'use client';
import { Button } from '@heroui/react';
import { FaStop } from 'react-icons/fa6';

export default function FloatingTimer() {
  return (
    <div className="absolute z-50 top-8 left-0 w-full  p-4">
      <div className="flex p-4 gap-2 w-full bg-black text-white shadow-lg rounded-2xl">
        <div className="flex justify-center items-center font-bold bg-black z-20 rounded-l-2xl text-2xl text-success-400">
          00:23:23
        </div>
        <div className="max-w-1/2 px-0">
          <div className="overflow-hidden font-bold text-lg w-full">
            <p
              className="text-nowrap animate-slide-loop"
              style={{
                width: `${'목표 명 여기다 작성 쭉 길게 작성해서 자동으로 스크롤 되게 만들기'.length * 12}px`,
              }}
            >
              목표 명 여기다 작성 쭉 길게 작성해서 자동으로 스크롤 되게 만들기
            </p>
          </div>
          <div className="flex items-center text-slate-200 gap-2">
            <span>할당량</span>
            <span className="flex items-baseline">
              <b className="text-white mr-1">234</b>
              <small>페이지</small>
            </span>
          </div>
        </div>
        <div className="flex items-center ml-auto bg-black rounded-r-2xl z-20">
          <Button
            color="danger"
            className="shrink-0"
            startContent={<FaStop className="text-white" />}
          >
            종료
          </Button>
        </div>
      </div>
    </div>
  );
}
