import DetailContainer from './components/DetailContainer';

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ goal_id: string }>;
}) {
  const { goal_id } = await params;
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="flex w-full font-bold text-2xl">목표 정보</h1>
      <DetailContainer goalID={Number(goal_id)} />
    </div>
  );
}
