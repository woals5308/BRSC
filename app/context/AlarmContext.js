import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePolyfill } from '../hook/usePolyfill';

const AlarmContext = createContext();

export const CONFIRMED_TYPES = [
  "INSTALL_CONFIRMED",
  "REMOVE_CONFIRMED",
  "COLLECTION_CONFIRMED",
  "FIRE_CONFIRMED"
];

export const AlarmProvider = ({ children }) => {
  const alarms = usePolyfill(); // SSE 실시간 알림
  const [alarmList, setAlarmList] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [removedIds, setRemovedIds] = useState([]); // ✅ 최종 완료된 알람 추적

  // ✅ 실시간 알람 업데이트 로직 (불변성 유지 + 최신 내용 반영)
  useEffect(() => {
    if (alarms && Array.isArray(alarms)) {
      setAlarmList((prev) => {
        const updatedMap = new Map();

        // 기존 알람들을 Map에 추가
        prev.forEach((alarm) => {
          updatedMap.set(alarm.id, alarm);
        });

        // 새로운 알람으로 최신 상태 갱신
        alarms.forEach((newAlarm) => {
          if (!removedIds.includes(newAlarm.id)) {
            updatedMap.set(newAlarm.id, newAlarm); // 같은 id면 덮어쓰기
          }
        });

        return Array.from(updatedMap.values());
      });
    }
  }, [alarms, removedIds]);

  const unreadCount = alarmList.filter(
    (alarm) => !readIds.includes(alarm.id)
  ).length;

  const markAllAsRead = () => {
    const allIds = alarmList.map((alarm) => alarm.id);
    setReadIds(allIds);
  };

  const removeAlarmById = (id) => {
    setAlarmList((prev) => prev.filter((alarm) => alarm.id !== id));
    setReadIds((prev) => [...prev, id]);
    setRemovedIds((prev) => [...prev, id]);
  };

  return (
    <AlarmContext.Provider
      value={{
        alarmList,
        setAlarmList,
        unreadCount,
        markAllAsRead,
        removeAlarmById,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => useContext(AlarmContext);
