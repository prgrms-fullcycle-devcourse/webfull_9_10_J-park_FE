import CountingText from './CountingText';

export default function Stats() {
  return (
    <div className="animate-fadeInOut flex flex-col p-6 gap-3 min-w-[430px] max-w-[430px] max-h-dvh content-center align-middle justify-center">
      <CountingText
        startText="등록된 목표"
        amount={2204021}
        endText="개"
        duration={2500}
      />
      <CountingText
        startText="목표를 이룬 회원"
        amount={302421}
        endText="명"
        duration={1500}
      />
      <CountingText
        startText="등불과 함께하는 회원"
        amount={50026}
        endText="명"
        duration={500}
      />
      <CountingText
        startText="누적 공부 시간"
        amount={777302301}
        endText="분"
        duration={3500}
      />
    </div>
  );
}
