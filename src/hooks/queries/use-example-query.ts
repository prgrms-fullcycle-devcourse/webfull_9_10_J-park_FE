import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';

// ============================================
// 타입 정의
// ============================================

interface Example {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

interface ExampleListParams {
    page?: number;
    limit?: number;
}

// ============================================
// Query Key Factory
// ============================================

/**
 * Query Key Factory 패턴
 *
 * 계층적으로 query key를 관리하여 invalidation을 쉽게 합니다.
 *
 * @example
 * // 모든 example 관련 쿼리 무효화
 * queryClient.invalidateQueries({ queryKey: exampleKeys.all });
 *
 * // 특정 목록 쿼리만 무효화
 * queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
 */
export const exampleKeys = {
    all: ['examples'] as const,
    lists: () => [...exampleKeys.all, 'list'] as const,
    list: (filters: ExampleListParams) =>
        [...exampleKeys.lists(), filters] as const,
    details: () => [...exampleKeys.all, 'detail'] as const,
    detail: (id: number) => [...exampleKeys.details(), id] as const,
};

// ============================================
// Query Hooks
// ============================================

/**
 * Example 목록을 조회하는 커스텀 훅
 *
 * @example
 * const { data, isLoading, error } = useExampleList({ page: 1, limit: 10 });
 */
export function useExampleList(params: ExampleListParams = {}) {
    return useQuery({
        queryKey: exampleKeys.list(params),
        queryFn: () => api.get<ApiResponse<Example[]>>('/examples', { params }),
    });
}

/**
 * Example 상세 조회 커스텀 훅
 *
 * @example
 * const { data, isLoading } = useExampleDetail(1);
 */
export function useExampleDetail(id: number) {
    return useQuery({
        queryKey: exampleKeys.detail(id),
        queryFn: () => api.get<ApiResponse<Example>>(`/examples/${id}`),
        enabled: !!id,
    });
}

// ============================================
// Mutation Hooks
// ============================================

/**
 * Example 생성 커스텀 훅
 *
 * @example
 * const { mutate, isPending } = useCreateExample();
 * mutate({ title: '새 항목', description: '설명' });
 */
export function useCreateExample() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Example, 'id' | 'createdAt'>) =>
            api.post<ApiResponse<Example>>('/examples', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
        },
    });
}
