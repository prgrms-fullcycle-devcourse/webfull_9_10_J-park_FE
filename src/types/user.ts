/** 전체 랭킹 조회 타입 */
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
  data: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
    totalTime: number | string;
    createdAt: string;
  };
}
