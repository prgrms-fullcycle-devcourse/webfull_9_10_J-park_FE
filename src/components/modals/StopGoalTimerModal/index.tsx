import GoalSubmitModal from '@/app/goals/[goal_id]/[daily_id]/components/GoalSubmitModal';
import { STORAGE_KEYS } from '@/constants';
import { api } from '@/lib/axios';
import { Button, useDisclosure } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { FaStop } from 'react-icons/fa6';

export default function StopTimerModal() {
  const dailyGoalID = localStorage.getItem(STORAGE_KEYS.startedDailyGoalID);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const mutate = useMutation({ mutationFn: () => api.post('/') });
  return (
    <>
      <Button
        className="shrink-0"
        radius="full"
        color="danger"
        startContent={<FaStop />}
        onPress={onOpen}
      >
        종료
      </Button>
    </>
  );
}
