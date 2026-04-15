import { Image } from '@heroui/react';
import LogoText from './logo-text.svg';

export default function Logo() {
  return (
    <div className="animate-fadeInSlow flex flex-col p-6 min-w-[430px] max-w-[430px] max-h-dvh content-center align-middle justify-center items-center">
      <Image alt="logo" src="/logo-all.svg" width={160} height={160} />
      <LogoText width="80" height="100" viewBox="0 0 510 279" />
    </div>
  );
}
