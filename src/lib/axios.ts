import axios from 'axios';
import type {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';

// ============================================
// Axios 인스턴스 설정
// ============================================

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// Request Interceptor
// ============================================

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 토큰이 있으면 Authorization 헤더에 주입
        // TODO: 프로젝트의 인증 방식에 맞게 수정하세요
        const token =
            typeof window !== 'undefined'
                ? localStorage.getItem('accessToken')
                : null;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// ============================================
// Response Interceptor
// ============================================

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // 공통 에러 핸들링
        if (error.response) {
            const { status } = error.response;

            switch (status) {
                case 401:
                    // TODO: 인증 만료 처리 (예: 토큰 갱신 또는 로그인 페이지 리다이렉트)
                    console.error('[API] 인증이 만료되었습니다.');
                    break;
                case 403:
                    console.error('[API] 접근 권한이 없습니다.');
                    break;
                case 404:
                    console.error('[API] 요청한 리소스를 찾을 수 없습니다.');
                    break;
                case 500:
                    console.error('[API] 서버 오류가 발생했습니다.');
                    break;
                default:
                    console.error(`[API] 오류 발생: ${status}`);
            }
        } else if (error.request) {
            console.error('[API] 서버에 연결할 수 없습니다.');
        }

        return Promise.reject(error);
    },
);

// ============================================
// 타입 안전한 API 호출 헬퍼 함수
// ============================================

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<T>(url, config).then((res) => res.data),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.post<T>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.put<T>(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.patch<T>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
