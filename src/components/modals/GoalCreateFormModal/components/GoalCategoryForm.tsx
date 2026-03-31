import { NumberInput, Select, SelectItem } from '@heroui/react';
import { useCreateGoalFormStore } from '../stores/useCreateGoalFormStore';
import { useQuery } from '@tanstack/react-query';

import { Category, CategoryResponse } from '@/types/api';
import { api } from '@/lib/axios';
import { CATEGORIES } from '@/constants';

export default function GoalCategoryForm() {
  const {
    data: categoryData,
    isLoading,
    isFetched,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () =>
      api.get<CategoryResponse>('/categories').then((res) => res.data),
  });

  const { totalAmount, category, setTotalAmount, setCategory } =
    useCreateGoalFormStore();

  if (isLoading || !isFetched) {
    return;
  }

  const categories =
    categoryData && categoryData.length > 0 ? categoryData : CATEGORIES;

  return (
    <section className="flex flex-col gap-3 min-w-full">
      <NumberInput
        isRequired
        value={totalAmount}
        onValueChange={setTotalAmount}
        size="lg"
        variant="bordered"
        label="총 분량"
        type="number"
        placeholder="목표 분량을 작성해주세요."
      />

      {
        <Select
          isRequired
          size="lg"
          label="카테고리"
          variant="bordered"
          items={categories.map((n) => ({ key: n.id, label: n.name }))}
          selectedKeys={category}
          onSelectionChange={(keys) => setCategory(keys.currentKey as string)}
        >
          {categories.map((c) => (
            <SelectItem key={c.id}>{c.name}</SelectItem>
          ))}
        </Select>
      }
    </section>
  );
}
