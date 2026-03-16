// ============================================
// API 공통 타입 정의
// ============================================

/**
 * API 공통 응답 타입
 *
 * 서버에서 반환하는 표준 응답 형태에 맞게 수정하세요.
 */
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

/**
 * 페이지네이션이 포함된 API 응답 타입
 */
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    message: string;
    success: boolean;
}

/**
 * API 에러 응답 타입
 */
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}
