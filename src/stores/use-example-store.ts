import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ============================================
// 타입 정의
// ============================================

interface ExampleState {
    // State
    count: number;
    isLoading: boolean;

    // Actions
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setLoading: (loading: boolean) => void;
}

// ============================================
// Store 생성
// ============================================

/**
 * 예시 Zustand 스토어
 *
 * 사용법:
 * ```tsx
 * const count = useExampleStore((state) => state.count);
 * const increment = useExampleStore((state) => state.increment);
 * ```
 *
 * 💡 Best Practice:
 * - 선택적으로 상태를 구독하세요 (불필요한 리렌더링 방지)
 * - 액션은 상태와 분리하여 구독하세요
 */
export const useExampleStore = create<ExampleState>()(
    devtools(
        (set) => ({
            // Initial State
            count: 0,
            isLoading: false,

            // Actions
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count - 1 })),
            reset: () => set({ count: 0 }),
            setLoading: (loading: boolean) => set({ isLoading: loading }),
        }),
        {
            name: 'example-store', // devtools에서 표시될 이름
        },
    ),
);
