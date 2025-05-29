import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

// 외부에서도 알람 상태를 업데이트할 수 있도록 전역 저장소 선언
let setAlarmsExternal = null;
let alarms = []; // 누적 알람 리스트
let sseRef = null; // SSE 연결 객체
let reconnectTimeoutRef = null; // 재연결 타이머

// 알람 데이터를 사용하는 컴포넌트에서 사용하는 훅
export const usePolyfill = () => {
  const [alarmsState, setAlarms] = useState([]);
  setAlarmsExternal = setAlarms;
  return alarmsState;
};

// SSE 연결 시작 함수 (로그인 후 호출)
export const connectSSE = async () => {
  const token = await AsyncStorage.getItem("usertoken");
  if (!token) {
    console.warn(" [SSE] 토큰 없음, 연결하지 않음");
    return;
  }

  // 기존 연결이 있다면 닫음
  if (sseRef) {
    console.log(" [SSE] 기존 연결 종료");
    sseRef.close();
  }

  console.log(" [SSE] 연결 시도 중...");
  const sse = new EventSourcePolyfill("http://10.20.39.98:8080/SSEsubscribe", {
    headers: {
      access: `Bearer ${token}`,
    },
    heartbeatTimeout: 86400000, // 하루종일 끊기지 않게 설정 (24시간 = 86400000ms)
  });

  // 연결 성공 시
  sse.onopen = () => {
    console.log(" [SSE] 연결 성공");
  };

  // 기본 메시지 수신 처리 (event: 생략된 경우 대비)
  sse.onmessage = (event) => {
    console.log(" [SSE] 기본 메시지 수신:", event.data);
  };

  // 'alarm' 이벤트 수신 처리
  sse.addEventListener("alarm", (event) => {
    console.log(" [SSE] 'alarm' 이벤트 수신됨:", event.data);
    try {
      const data = JSON.parse(event.data);
      alarms = [data, ...alarms.filter((a) => a.id !== data.id)];
      setAlarmsExternal?.([...alarms]);
    } catch (e) {
      console.error(" [SSE] JSON 파싱 오류:", e);
    }
  });

  // 오류 발생 시 자동 재연결
  sse.onerror = (err) => {
    console.error("[SSE] 연결 오류:", err);
    if (sseRef) sseRef.close();
    sseRef = null;

    // 중복 재연결 방지
    if (!reconnectTimeoutRef) {
      console.log(" [SSE] 3초 후 재연결 시도");
      reconnectTimeoutRef = setTimeout(() => {
        connectSSE();
        reconnectTimeoutRef = null;
      }, 3000);
    }
  };

  // 연결 객체 저장
  sseRef = sse;
};
