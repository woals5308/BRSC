import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axiosWebInstance from '../api/axiosweb';


// 미해결 알람 
export const useUnresolvedAlarms = () => {
  const [unresolvedAlarms, setUnresolvedAlarms] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosWebInstance.get('/alarm/unResolved');
        if (Array.isArray(response.data)) {
          setUnresolvedAlarms(response.data);
        }
      } catch (e) {
        console.error(' 미해결 알람 로딩 실패:', e);
      }
    };
    fetch();
  }, []);

  return [unresolvedAlarms, setUnresolvedAlarms];
};
