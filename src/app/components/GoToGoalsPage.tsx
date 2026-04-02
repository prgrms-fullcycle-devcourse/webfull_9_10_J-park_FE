import { Button, Card, Link } from '@heroui/react';
import { IoChevronForwardOutline } from 'react-icons/io5';

export default function GoToGoalsPage() {
  return (
    <Card className="animate-fadeIn">
      <Button
        as={Link}
        variant="light"
        href={`/goals`}
        fullWidth
        className="flex items-center justify-between h-full px-6 py-4"
        draggable
        radius="none"
      >
        <p className="font-black text-xl h-full">목표 관리</p>
        <Button
          radius="full"
          className="p-0"
          isIconOnly
          disableAnimation
          disableRipple
          variant="light"
        >
          <IoChevronForwardOutline size={20} />
        </Button>
      </Button>
    </Card>
  );
}
