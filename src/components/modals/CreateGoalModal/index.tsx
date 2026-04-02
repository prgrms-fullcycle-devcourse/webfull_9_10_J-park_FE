import { CATEGORIES } from '@/constants';
import { api } from '@/lib/axios';
import { CreateGoalResponse } from '@/types/api';
import {
  addToast,
  Button,
  DateRangePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@heroui/react';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { CgAddR } from 'react-icons/cg';

export default function CreateGoalModal() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>();
  const [detail, setDetail] = useState<string>();
  const [categoryID, setCategoryID] = useState<number>();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [startDate, setStartDate] = useState<CalendarDate>(() =>
    today(getLocalTimeZone()),
  );
  const [endDate, setEndDate] = useState<CalendarDate>(() =>
    today(getLocalTimeZone()).add({ days: 7 }),
  );

  const { mutate } = useMutation<
    CreateGoalResponse,
    Error,
    {
      title: string;
      detail: string;
      categoryId: number;
      totalAmount: number;
      startDate: string;
      endDate: string;
    }
  >({
    mutationFn: (params) => api.post('/goals', params),
    onSuccess: (_, { title }) => {
      onClose();
      addToast({
        color: 'success',
        title: '목표가 등록되었습니다',
        description: `"${title}" 목표가 성공적으로 생성되었습니다`,
      });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['todayGoals'] });
    },
    onError: () => {
      addToast({
        color: 'danger',
        title: '목표를 등록하지 못했습니다.',
        description: `문제가 발생했습니다. 잠시후 다시 시도해주세요`,
      });
    },
  });

  const step = 4;

  const submit = useCallback(() => {
    if (!title) {
      addToast({
        color: 'danger',
        title: '목표명을 입력해주세요',
      });
    } else if (!detail) {
      addToast({
        color: 'danger',
        title: '목표 설명을 입력해주세요',
      });
    } else if (!categoryID) {
      addToast({
        color: 'danger',
        title: '카테고리를 선택해주세요',
      });
    } else if (!totalAmount) {
      addToast({
        color: 'danger',
        title: '총 분량을 입력해주세요',
      });
    } else if (!startDate) {
      addToast({
        color: 'danger',
        title: '시작일을 선택해주세요',
      });
    } else if (!endDate) {
      addToast({
        color: 'danger',
        title: '종료일을 선택해주세요',
      });
    } else {
      mutate({
        title,
        detail,
        categoryId: categoryID,
        totalAmount,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      });
    }
  }, [title, detail, categoryID, totalAmount, startDate, endDate, mutate]);

  return (
    <>
      <Button
        radius="none"
        className="[&>svg]:shrink-0 col-span-1 w-full h-full border-t-1 border-slate-200 text-success-400 "
        onPress={onOpen}
        isIconOnly
        variant="light"
      >
        <CgAddR size={28} />
      </Button>
      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody className="p-4 max-h-1/3">
            <div className="animate-fadeIn bg-slate-50 rounded-2xl p-4">
              <small className="text-gray-600">목표</small>
              <Input
                aria-label="title"
                variant="bordered"
                value={title}
                onValueChange={setTitle}
                required
                maxLength={30}
                classNames={{
                  input:
                    'font-black text-2xl border-none placeholder:text-gray-300',
                  inputWrapper: 'border-none shadow-none min-h-8 h-8 p-0 ',
                }}
                placeholder="목표가 뭐에요?"
              />
            </div>
            {step > 0 && (
              <div className="animate-fadeIn bg-slate-50 rounded-2xl p-4">
                <small className="text-gray-600">설명</small>
                <Textarea
                  aria-label="detail"
                  required
                  maxLength={50}
                  value={detail}
                  variant="bordered"
                  onValueChange={setDetail}
                  className="scrollbar-hide"
                  classNames={{
                    input:
                      'font-black text-2xl border-none placeholder:text-gray-300',
                    inputWrapper: 'border-none shadow-none min-h-8 h-8 p-0 ',
                  }}
                  placeholder="어떤 목표인가요?"
                />
              </div>
            )}
            {step > 1 && (
              <div className="animate-fadeIn flex flex-col items-center gap-4  bg-slate-50 rounded-2xl p-4">
                <small className="text-gray-600 w-full">카테고리</small>
                <div className="flex gap-4 w-full">
                  <NumberInput
                    aria-label="totalAmount"
                    isRequired={true}
                    hideStepper
                    variant="bordered"
                    value={totalAmount}
                    onValueChange={setTotalAmount}
                    required
                    maxLength={30}
                    classNames={{
                      input:
                        'font-black text-2xl border-none placeholder:text-gray-300',
                      inputWrapper: 'border-none shadow-none min-h-8 h-8 p-0',
                    }}
                    placeholder="분량이 어느정도 인가요?"
                  />
                  <Select
                    aria-label="category"
                    isRequired
                    variant="bordered"
                    value={categoryID}
                    items={CATEGORIES.map((n) => ({
                      key: n.id,
                      label: n.name,
                    }))}
                    className="max-w-34"
                    placeholder="카테고리"
                    classNames={{
                      value: 'font-black text-2xl border-none text-gray-300',
                      trigger:
                        'border-none shadow-none min-h-8 h-8 p-0 placeholder:text-gray-300',
                    }}
                    onSelectionChange={(keys) =>
                      setCategoryID(Number(keys.currentKey))
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id}>{c.name}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
            {step > 2 && (
              <>
                <div className="animate-fadeIn bg-slate-50 rounded-2xl p-4">
                  <small className="text-gray-600">
                    언제부터 시작하시나요?
                  </small>
                  <DateRangePicker
                    value={{
                      start: startDate,
                      end: endDate,
                    }}
                    onChange={(v) => {
                      if (v) {
                        setStartDate(v.start);
                        setEndDate(v.end);
                      }
                    }}
                    classNames={{
                      input:
                        'font-black text-2xl border-none placeholder:text-gray-300',
                    }}
                  />
                </div>
                <div className="animate-fadeIn">
                  <Button fullWidth size="lg" color="primary" onPress={submit}>
                    등록하기
                  </Button>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
