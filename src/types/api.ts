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

/** 전체 랭킹 조회 API 응답 타입 */
export type RankingItem = {
  rank: number;
  userId: number;
  nickname: string;
  profileImage: string;
  totalTime: string;
};

/** 전체 랭킹 조회 API 응답 데이터 (GET /rankings) */
export interface RankingsResponse {
  success: boolean;
  message: string;
  data: {
    myRanking: number;
    topRankings: RankingItem[];
    ranks: RankingItem[];
  };
}

/** 내 정보 조회 API 응답 타입 */
export type TodayGoal = {
  id: number;
  title: string;
  todayQuota: number;
};

/** 내 정보 조회 API 응답 데이터 (GET /users/me) */
export interface MyProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
    totalTime: number | string;
    createdAt: string;
  };
}

export interface GoalsResponse {
  success: boolean;
  message: string;
  data: {
    goals: Goal[];
  };
}

export type Goal = {
  id: number;
  title: string;
  endDate: string;
  description: string;
  progressRate: number;
};
