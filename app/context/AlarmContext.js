// app/context/AlarmContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePolyfill } from '../hook/usePolyfill';

const AlarmContext = createContext();

//  제외할 알람 타입
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

  //  실시간 알람 수신 → 기존 알람과 병합 or 업데이트
  useEffect(() => {
    if (alarms && Array.isArray(alarms)) {
      setAlarmList((prev) => {
        const updated = [...prev];

        for (const newAlarm of alarms) {
          // 확정된 알람은 제외
          if (CONFIRMED_TYPES.includes(newAlarm.type)) continue;

          const idx = updated.findIndex((a) => a.id === newAlarm.id);
          if (idx !== -1) {
            updated[idx] = newAlarm; //  기존 알람 업데이트
          } else {
            updated.push(newAlarm); //  신규 알람 추가
          }
        }

        return updated;
      });
    }
  }, [alarms]);

  //  읽지 않은 알람 수
  const unreadCount = alarmList.filter(
    (alarm) => !readIds.includes(alarm.id)
  ).length;

  //  전체 읽음 처리
  const markAllAsRead = () => {
    const allIds = alarmList.map((alarm) => alarm.id);
    setReadIds(allIds);
  };

  //  개별 알람 제거 (예: 최종 확인 시)
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
