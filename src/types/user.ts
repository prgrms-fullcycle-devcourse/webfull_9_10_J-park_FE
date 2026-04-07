/** 전체 랭킹 조회 타입 */
export type RankingItem = {
  rank: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  totalTime: number;
};

/** 전체 랭킹 조회 API 응답 데이터 (GET /rankings) */
export interface RankingsResponse {
  success: boolean;
  message: string;
  data: Ranking;
}
export interface Ranking {
  myRanking: { myRanking: number };
  topRankings: RankingItem[];
  ranks: RankingItem[];
}

/** 내 정보 조회 타입 */
export type TodayGoal = {
  id: number;
  title: string;
  todayQuota: number;
};

/** 내 정보 조회 API 응답 데이터 (GET /users/me) */
export interface MyProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export type User = {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  totalTime: number | string;
  createdAt: string;
  goals: {
    id: number;
    title: string;
    todayQuota: number;
  }[];
};
