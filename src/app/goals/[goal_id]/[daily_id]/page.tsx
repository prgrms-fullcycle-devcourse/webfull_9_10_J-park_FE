import NavigationBar from '@/components/navigationBar';
import DailyGoalTimer from './components/DailyGoalTimer';
import TodayGoalDailyDetail from './components/TodayGoalDailyDetail';
import DailyGoalList from './components/DailyGoalList';

const DUMMY_GOALS = [
  {
    id: 1,
    title: '목표 1',
    studyTime: 900000,
    currentAmount: 10,
    targetAmount: 10,
    unit: '페이지',
    completed: true,
  },
  {
    id: 2,
    title: '목표 2',
    studyTime: 3600000,
    currentAmount: 12,
    targetAmount: 10,
    unit: '페이지',
    completed: true,
  },
  {
    id: 3,
    title: '목표 3',
    studyTime: 1800000,
    currentAmount: 2,
    targetAmount: 10,
    unit: '페이지',
    completed: false,
  },
];

export default async function DailyGoalDetailPage({
  params,
}: {
  params: Promise<{ goal_id: string; daily_id: string }>;
}) {
  const resolvedParams = await params;
  const currentGoalId = Number(resolvedParams.goal_id);

  const currentGoal =
    DUMMY_GOALS.find((g) => g.id === currentGoalId) || DUMMY_GOALS[0];

  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-y-auto scrollbar-hide pb-20"
      style={{ backgroundColor: '#2a2a2a' }}
    >
      <div className="flex-1 p-5 flex flex-col gap-6">
        <DailyGoalTimer
          goalId={currentGoal.id}
          goalTitle={currentGoal.title}
          quotaText={`할당량`}
          initialStudyTime={currentGoal.studyTime || 0}
        />

        <hr className="border-gray-500" />

        <TodayGoalDailyDetail ratio={66} completedGoals={2} totalGoals={3} />

        <DailyGoalList goals={DUMMY_GOALS} />
      </div>

      <NavigationBar />
    </div>
  );
}
