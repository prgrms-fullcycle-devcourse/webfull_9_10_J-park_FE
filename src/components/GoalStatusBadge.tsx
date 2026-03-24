import { Chip } from '@heroui/react';

interface GoalStatusBadgeProps {
  status: '달성' | '미달성';
}

export default function GoalStatusBadge({ status }: GoalStatusBadgeProps) {
  const isAchieved = status === '달성';

  return (
    <Chip
      size="sm"
      variant="bordered"
      color={isAchieved ? 'success' : 'warning'}
    >
      {status}
    </Chip>
  );
}
