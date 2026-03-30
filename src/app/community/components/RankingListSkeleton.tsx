import { Divider, Skeleton } from '@heroui/react';

interface Props {
  rows?: number;
}

export default function RankingListSkeleton({ rows = 11 }: Props) {
  return (
    <div>
      {new Array(rows)
        .fill(() => false)
        .map((n, i) => (
          <div key={`users-ranking-skeleton-${i}`}>
            <div className="flex items-center gap-2 min-w-full min-h-15 px-6">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-6 w-48 rounded-xl" />
              <Skeleton className="h-6 w-24 rounded-xl ml-auto" />
            </div>
            <Divider />
          </div>
        ))}
    </div>
  );
}
