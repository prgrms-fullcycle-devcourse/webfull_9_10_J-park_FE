# 프로젝트 템플릿

Next.js 기반 프론트엔드 프로젝트 템플릿입니다.

## 기술 스택

| 기술                                         | 버전 | 용도                    |
| -------------------------------------------- | ---- | ----------------------- |
| [Next.js](https://nextjs.org/)               | 15.x | 프레임워크 (App Router) |
| [React](https://react.dev/)                  | 19.x | UI (TypeScript)         |
| [TailwindCSS](https://tailwindcss.com/)      | 4.x  | 스타일링                |
| [HeroUI](https://heroui.com/)                | 2.x  | UI 컴포넌트 라이브러리  |
| [Zustand](https://zustand.docs.pmnd.rs/)     | 5.x  | 전역 상태관리           |
| [TanStack Query](https://tanstack.com/query) | 5.x  | 서버 상태관리           |
| [day.js](https://day.js.org/)                | 1.x  | 날짜 관리               |
| [Axios](https://axios-http.com/)             | 1.x  | HTTP 통신               |

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local

# 3. 개발 서버 실행
npm run dev
```

`http://localhost:7263` 에서 확인할 수 있습니다.

## 폴더 구조

```
src/
├── app/                    # Next.js App Router (라우팅, 레이아웃)
│   ├── layout.tsx          # Root 레이아웃
│   ├── page.tsx            # 홈 페이지
│   ├── providers.tsx       # 전역 Provider (HeroUI + TanStack Query)
│   └── globals.css         # 전역 스타일
├── components/             # 공통 컴포넌트
│   └── ui/                 # 커스텀 UI 컴포넌트
├── hooks/                  # 커스텀 훅
│   └── queries/            # TanStack Query 커스텀 훅
├── lib/                    # 유틸리티 & 외부 라이브러리 설정
│   ├── axios.ts            # Axios 인스턴스 (Interceptors)
│   ├── dayjs.ts            # day.js 로케일 & 플러그인 설정
│   └── utils.ts            # 공통 유틸리티 함수
├── stores/                 # Zustand 스토어
├── types/                  # TypeScript 타입 정의
└── constants/              # 상수 정의
```

## 코딩 컨벤션

### 파일 네이밍

| 종류     | 규칙                   | 예시                |
| -------- | ---------------------- | ------------------- |
| 컴포넌트 | PascalCase             | `UserCard.tsx`      |
| 훅       | camelCase (use 접두사) | `use-auth.ts`       |
| 스토어   | camelCase (use 접두사) | `use-auth-store.ts` |
| 유틸리티 | camelCase              | `format-date.ts`    |
| 타입     | camelCase              | `user.ts`           |
| 상수     | camelCase              | `api-routes.ts`     |

### 상태관리 가이드

- **전역 UI 상태** (모달, 사이드바 등) → **Zustand**
- **서버 데이터** (API 응답, CRUD) → **TanStack Query**
- **컴포넌트 로컬 상태** → **useState / useReducer**

### Zustand 사용법

```tsx
// 선택적 구독 (Best Practice)
const count = useExampleStore((state) => state.count);
const increment = useExampleStore((state) => state.increment);

// ❌ 전체 스토어 구독 (불필요한 리렌더링 발생)
const store = useExampleStore();
```

### TanStack Query 사용법

```tsx
// Query Key Factory 패턴 사용
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: object) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// 커스텀 훅으로 감싸서 사용
export function useUserList(params: UserListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => api.get('/users', { params }),
  });
}
```

### Axios 사용법

```tsx
import { api } from '@/lib/axios';

// 타입 안전한 API 호출
const users = await api.get<ApiResponse<User[]>>('/users');
const user = await api.post<ApiResponse<User>>('/users', { name: '홍길동' });
```

### day.js 사용법

```tsx
import dayjs from '@/lib/dayjs';

// 한국어 로케일이 기본 적용됨
dayjs().format('YYYY년 M월 D일'); // '2025년 1월 1일'
dayjs('2025-01-01').fromNow(); // '1달 전'
```

## 환경변수

| 변수명                | 설명         | 기본값                                  |
| --------------------- | ------------ | --------------------------------------- |
| `NEXT_PUBLIC_API_URL` | API 서버 URL | `https://lampfire-backend.onrender.com` |
| `NEXT_PUBLIC_APP_URL` | 앱 URL       | `http://localhost:7263`                 |

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```
