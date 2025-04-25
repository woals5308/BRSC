import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import EventSource from 'react-native-event-source';


//실시간 알람람
export const useSSEAlarms = () => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const sse = new EventSource('http://192.168.0.20:8080/SSEsubscribe?token=이창진기재민');

    console.log("sse 구독 후 상태: ", sse)

 
    
    sse.addEventListener('alarm', (event) => {
      try {
        console.log(' 실시간 알림 수신1:', data);
        const data = JSON.parse(event.data);
        console.log(' 실시간 알림 수신2:', data);
        setAlarms(prev => [data, ...prev.filter(a => a.id !== data.id)]);
      } catch (e) {
        console.error('JSON 파싱 실패:', e);
      }
    });

    sse.onerror = (err) => {
      console.error('SSE 오류:', err);
      sse.close();
    };

    return () => sse.close();
  }, []);

  return alarms;
};
