import DailyGoalList from './components/DailyGoalList';
import GoalDetailInformation from './components/GoalDetailInformation';
import GoalProgression from './components/GoalProgression';

const sampleData = {
  id: 1, // 목표 id
  title: '목표 1', // 목표 이름
  description: '목표의 설명입니다.', // 목표 설명
  category: '책', // 목표 카테고리
  progress: {
    rate: 78, // 진행률
    currentAmount: 78, // 현재 진행도
    targetAmount: 100, // 목표
    totalStudyTime: 876489473, // 해당 목표의 총 공부 시간
    unit: '페이지', // 단위
  }, // 진행도 관련 정보

  period: {
    startDate: '2026-02-01',
    endDate: '2026-03-30',
    daysRemaining: 13,
  }, // 목표 기간 정보
  dailyProgress: [
    {
      date: '2026-03-14',
      targetAmount: 3, // 해당 일자의 목표 할당량
      completedAmount: 3, // 실제 완료한 분량
      isCompleted: true,
      studyTime: 39334748, // 해당 일자의 해당 목표 공부 시간
      isToday: false,
    },
    {
      date: '2026-03-15',
      targetAmount: 4,
      completedAmount: 4,
      isCompleted: true,
      studyTime: 2733902,
      isToday: false,
    },
    {
      date: '2026-03-16',
      targetAmount: 3,
      completedAmount: 3,
      isCompleted: true,
      studyTime: 2733902,
      isToday: false,
    },
    {
      date: '2026-03-17',
      targetAmount: 5,
      completedAmount: 7,
      isCompleted: true,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-18',
      targetAmount: 5,
      completedAmount: 3,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-19',
      targetAmount: 3,
      completedAmount: 2,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-20',
      targetAmount: 3,
      completedAmount: 3,
      isCompleted: true,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-21',
      targetAmount: 3,
      completedAmount: 2,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-22',
      targetAmount: 3,
      completedAmount: 0,
      isCompleted: false,
      studyTime: 2836238,
      isToday: true,
    },
    {
      date: '2026-03-23',
      targetAmount: 3,
      completedAmount: 3,
      isCompleted: true,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-24',
      targetAmount: 3,
      completedAmount: 2,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-25',
      targetAmount: 3,
      completedAmount: 0,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-26',
      targetAmount: 3,
      completedAmount: 3,
      isCompleted: true,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-27',
      targetAmount: 3,
      completedAmount: 2,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-28',
      targetAmount: 3,
      completedAmount: 0,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-29',
      targetAmount: 3,
      completedAmount: 3,
      isCompleted: true,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-30',
      targetAmount: 3,
      completedAmount: 2,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
    {
      date: '2026-03-31',
      targetAmount: 3,
      completedAmount: 0,
      isCompleted: false,
      studyTime: 2836238,
      isToday: false,
    },
  ],
};

export default function GoalDetail() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h1 className="flex w-full font-bold text-2xl">목표 정보</h1>
      <GoalDetailInformation
        title={sampleData.title}
        description={sampleData.description}
        category={sampleData.category}
        totalAmount={sampleData.progress.targetAmount}
        startDate={sampleData.period.startDate}
        endDate={sampleData.period.endDate}
      />
      <GoalProgression
        progress={sampleData.progress}
        period={sampleData.period}
      />
      {/*
       * 목표 총 공부시간
       */}
      <DailyGoalList dailyProgress={sampleData.dailyProgress} />
    </div>
  );
}
