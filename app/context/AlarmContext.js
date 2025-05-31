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

  useEffect(() => {
    if (alarms && Array.isArray(alarms)) {
      setAlarmList((prev) => {
        const updated = [...prev];

        for (const newAlarm of alarms) {
          // ✅ 이미 제거된 알람은 무시
          if (removedIds.includes(newAlarm.id)) continue;

          const idx = updated.findIndex((a) => a.id === newAlarm.id);
          if (idx !== -1) {
            updated[idx] = newAlarm;
          } else {
            updated.push(newAlarm);
          }
        }

        return updated;
      });
    }
  }, [alarms, removedIds]); // ✅ removedIds 의존성 추가

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
    setRemovedIds((prev) => [...prev, id]); // ✅ 제거된 알람 id 기록
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
