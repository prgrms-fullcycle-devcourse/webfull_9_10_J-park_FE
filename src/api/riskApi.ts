export const fetchRiskData = async () => {
  const response = await fetch('https://lampfire-backend.onrender.com/risks', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('위험도 데이터를 불러오는데 실패했습니다.');
  }

  return response.json();
};
