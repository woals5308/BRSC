// app/context/AlarmContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePolyfill } from '../hook/usePolyfill';

const AlarmContext = createContext();

export const CONFIRMED_TYPES = [
  "INSTALL_CONFIRMED",
  "REMOVE_CONFIRMED",
  "COLLECTION_CONFIRMED",
  "FIRE_CONFIRMED",
];

export const AlarmProvider = ({ children }) => {
  const alarms = usePolyfill(); // 실시간 알림
  const [alarmList, setAlarmList] = useState([]);
  const [readIds, setReadIds] = useState([]);

  // 알람 수신 시 갱신
  useEffect(() => {
    if (alarms && Array.isArray(alarms)) {
      setAlarmList(alarms);
    }
  }, [alarms]);

  // 읽지 않은 알람 수
  const unreadCount = alarmList.filter(
    (alarm) => !readIds.includes(alarm.id)
  ).length;

  // 전체 읽음 처리
  const markAllAsRead = () => {
    const allIds = alarmList.map((alarm) => alarm.id);
    setReadIds(allIds);
  };

  // ✅ 개별 알람 제거 함수 (예: 최종확인 시)
  const removeAlarmById = (id) => {
    setAlarmList((prev) => prev.filter((alarm) => alarm.id !== id));
    setReadIds((prev) => [...prev, id]);
  };

  return (
    <AlarmContext.Provider
      value={{ alarmList, setAlarmList, unreadCount, markAllAsRead, removeAlarmById }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => useContext(AlarmContext);
