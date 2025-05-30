import { useEffect, useState } from 'react';
import axiosWebInstance from '../api/axiosweb';
import axiosInstance from '../api/axiosInstance';

const useTotalPoint = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await axiosInstance.get('/myBoxLog');

        if (Array.isArray(res.data)) {
          const sum = res.data.reduce((acc, log) => {
            const value = log?.boxLog?.value;
            return acc + (typeof value === 'number' ? value : 0);
          }, 0);

          setTotal(sum);
        } else {
          setTotal(0);
        }
      } catch (e) {
        console.error('📛 포인트 계산 오류:', e);
        setTotal(0);
      }
    };

    fetchPoints();
  }, []);

  return total;
};

export default useTotalPoint;