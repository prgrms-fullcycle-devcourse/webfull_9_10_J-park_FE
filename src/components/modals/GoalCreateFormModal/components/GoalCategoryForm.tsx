import { Input, Select, SelectItem, Skeleton } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';
import { useQuery } from '@tanstack/react-query';

import { Category, CategoryResponse } from '@/types/api';
import { api } from '@/lib/axios';

export default function GoalCategoryForm() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () =>
      api.get<CategoryResponse>('/categories').then((res) => res.data),
  });

  const { totalAmount, category, setTotalAmount, setCategory } =
    useCreateGoalFormStore();

  if (isError) {
    return;
  }
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

      {categories && (
        <Select
          isRequired
          size="lg"
          label="카테고리"
          variant="bordered"
          items={categories.map((n) => ({ key: n.id, label: n.name }))}
          selectedKeys={category}
          onSelectionChange={(key) => setCategory(key as string)}
        >
          {categories.map((c) => (
            <SelectItem key={c.id}>{c.name}</SelectItem>
          ))}
        </Select>
      )}
    </section>
  );
}
