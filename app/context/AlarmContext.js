// app/context/AlarmContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePolyfill } from '../hook/usePolyfill'; // 실시간 알림 훅

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const alarms = usePolyfill();
  const [alarmList, setAlarmList] = useState([]);

  useEffect(() => {
    if (alarms && Array.isArray(alarms)) {
      setAlarmList(alarms);
    }
  }, [alarms]);

  // ✅ 절대로 문자열 반환 없이, 순수 JSX만 반환
  return (
    <AlarmContext.Provider value={{ alarmList, setAlarmList }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => useContext(AlarmContext);
