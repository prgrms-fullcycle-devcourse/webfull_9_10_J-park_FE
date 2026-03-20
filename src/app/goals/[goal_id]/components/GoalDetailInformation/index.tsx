'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  RangeCalendar,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';
import { useState } from 'react';

interface Props {
  title: string;
  description: string;
  category: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
}

export default function GoalDetailInformation({
  title,
  description,
  category,
  totalAmount,
  startDate,
  endDate,
}: Props) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const [newTotalAmount, setNewTotalAmount] = useState(totalAmount.toString());
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);

  return (
    <Card fullWidth>
      <CardBody className="flex gap-4">
        <Input
          size="lg"
          label="목표 이름"
          variant="bordered"
          labelPlacement="outside-top"
          value={newTitle}
          onValueChange={setNewTitle}
        />
        <Textarea
          size="lg"
          label="목표 설명"
          variant="bordered"
          labelPlacement="outside-top"
          value={newDescription}
          onValueChange={setNewDescription}
        />
        <div className="flex gap-4">
          <Input
            size="lg"
            label="총 목표량"
            variant="bordered"
            labelPlacement="outside-top"
            value={newTotalAmount}
            onValueChange={setNewTotalAmount}
          />
          <Select size="lg" variant="bordered">
            <SelectItem>페이지</SelectItem>
            <SelectItem>개</SelectItem>
            <SelectItem>분</SelectItem>
          </Select>
        </div>

        <div>목표 기한</div>
        <RangeCalendar calendarWidth="full" />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button color="success" disabled>
          저장
        </Button>
      </CardFooter>
    </Card>
  );
}
