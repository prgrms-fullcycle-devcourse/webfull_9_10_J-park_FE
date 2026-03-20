import { type ClassValue, clsx } from 'clsx';

/**
 * 조건부 className을 결합하는 유틸리티 함수
 *
 * @example
 * cn('text-red', isActive && 'bg-blue', 'p-4')
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 지정된 밀리초만큼 대기하는 유틸리티 함수 (개발/테스트용)
 *
 * @example
 * await sleep(1000); // 1초 대기
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 값이 비어있는지 검사하는 유틸리티 함수
 */
export function isEmpty(value: string | null | undefined | unknown[]): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

// 밀리초 00:00:00 형태로 변환 함수
export function formatMilliseconds(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}
