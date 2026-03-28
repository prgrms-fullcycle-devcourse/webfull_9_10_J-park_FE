import apiClient from '@/lib/axios';

export const fetchRiskData = async () => {
  const response = await apiClient.get('/risks');

  return response.data;
};
