import { Input, Select, SelectItem } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';

const categories = [
  { key: 'book', label: '책', unit: '페이지' },
  { key: 'study', label: '공부', unit: '분' },
];

export default function GoalCategoryForm() {
  const { totalAmount, category, setTotalAmount, setCategory } =
    useCreateGoalFormStore();
  return (
    <section className="flex flex-col gap-3 min-w-full">
      <Input
        isRequired
        value={totalAmount}
        onValueChange={setTotalAmount}
        size="lg"
        variant="bordered"
        label="총 분량"
        type="number"
        placeholder="목표 분량을 작성해주세요."
      />
      <Select
        isRequired
        size="lg"
        label="카테고리"
        variant="bordered"
        items={categories}
        selectedKeys={category}
        onSelectionChange={(key) => setCategory(key as string)}
      >
        {categories.map((c) => (
          <SelectItem key={c.key}>{c.label}</SelectItem>
        ))}
      </Select>
    </section>
  );
}
