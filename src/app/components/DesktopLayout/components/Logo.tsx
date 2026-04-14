import { Image } from '@heroui/react';

export default function Logo() {
  return (
    <div className="animate-fadeInSlow flex flex-col p-6 gap-3 min-w-[430px] max-w-[430px] max-h-dvh content-center align-middle justify-center items-center">
      <Image alt="logo" src="/logo-all.svg" width={160} height={160} />
      <h1 className="font-korean font-bold text-6xl text-gray-600 mt-2">
        등불
      </h1>
    </div>
  );
}
