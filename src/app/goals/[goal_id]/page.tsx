import DetailContainer from './components/DetailContainer';

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ goal_id: string }>;
}) {
  const { goal_id } = await params;
  return <DetailContainer goalID={Number(goal_id)} />;
}
