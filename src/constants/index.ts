export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
} as const;

export const STYLE = {
  NAVBAR_HEIGHT: '4rem',
};

export const ROUTE = {
  HOME: '/',
  GOALS: '/goals',
  COMMUNITY: '/community',
  ME: '/me',
};

export const CATEGORIES = [
  { id: 1, name: '책', unit: '장' },
  { id: 2, name: '강의', unit: '강' },
];

export const STORAGE_KEYS = {
  startedDailyGoalID: 'started_daily_goal_ID',
};
