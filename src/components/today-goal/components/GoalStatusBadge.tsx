interface GoalStatusBadgeProps {
  status: '달성' | '미달성';
}

export default function GoalStatusBadge({ status }: GoalStatusBadgeProps) {
  const isAchieved = status === '달성';

  return (
    <div
      className={`px-3 py-1 text-sm font-bold text-black ${
        isAchieved ? 'bg-green-500' : 'bg-orange-500'
      }`}
    >
      {status}
    </div>
  );
}
