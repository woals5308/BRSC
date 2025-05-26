import { useEffect, useState, useCallback } from 'react';
import axiosWebInstance from '../api/axiosweb';

// 미해결 알람 가져오는 훅
export const useUnresolvedAlarms = () => {
  const [unresolvedAlarms, setUnresolvedAlarms] = useState([]);

  const fetchAlarms = useCallback(async () => {
    try {
      const response = await axiosWebInstance.get('/alarm/unResolved');
      console.log("response.data: ", response.data);
      if (Array.isArray(response.data)) {
        setUnresolvedAlarms(response.data);
      }
    } catch (e) {
      console.error('미해결 알람 로딩 실패:', e);
    }
  }, []);

  // 초기에 한 번 호출
  useEffect(() => {
    fetchAlarms();
  }, [fetchAlarms]);

  //  알람 목록과 수동 새로고침 함수 둘 다 반환
  return [unresolvedAlarms, fetchAlarms];
};
