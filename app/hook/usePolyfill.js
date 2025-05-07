import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

// 🔸 외부에서도 알람 상태를 업데이트할 수 있도록 전역에서 set 함수와 저장소 선언
let setAlarmsExternal = null;
let alarms = []; // 알람을 누적 저장하는 변수
let sseRef = null; // SSE 연결 객체
let reconnectTimeoutRef = null; // 재연결 타이머

// 🔸 알람 데이터를 사용하는 컴포넌트에서 이 훅을 사용하여 알람 상태 접근
export const usePolyfill = () => {
  const [alarmsState, setAlarms] = useState([]);
  setAlarmsExternal = setAlarms; // 외부에서도 setState 가능하도록 저장
  return alarmsState; // 화면에서 사용할 알람 상태 반환
};

// 🔸 로그인 성공 시 호출하여 알람 수신을 시작하는 함수
export const connectSSE = async () => {
  const token = await AsyncStorage.getItem("usertoken"); // 저장된 JWT 토큰 조회
  if (!token) return; // 토큰 없으면 연결 안 함

  // 기존 SSE 연결이 있으면 먼저 닫음
  if (sseRef) {
    sseRef.close();
  }

  // 새로운 SSE 연결 생성
  const sse = new EventSourcePolyfill("http://192.168.0.20:8080/SSEsubscribe", {
    headers: {
      access: `Bearer ${token}`, // 인증 헤더 포함
    },
  });

  // 연결이 정상적으로 열렸을 때 콜백
  sse.onopen = () => {
    // 연결 성공
  };

  // 알람 이벤트 수신 시 처리
  sse.addEventListener("alarm", (event) => {
    try {
      const data = JSON.parse(event.data); // JSON 데이터 파싱
      alarms = [data, ...alarms.filter(a => a.id !== data.id)]; // 중복 제거 후 저장
      setAlarmsExternal?.([...alarms]); // 상태 업데이트 (컴포넌트에 반영)
    } catch (e) {
      // 데이터 파싱 에러 
      console.error("에러 발생발생",e);
      
    }
  });

  // 오류 발생 시: 연결 끊기고 일정 시간 후 재연결 시도
  sse.onerror = () => {
    if (sseRef) sseRef.close();
    sseRef = null;

    // 재연결 타이머가 없다면 3초 후 다시 연결 시도
    if (!reconnectTimeoutRef) {
      reconnectTimeoutRef = setTimeout(() => {
        connectSSE();
        reconnectTimeoutRef = null;
      }, 3000);
    }
  };

  sseRef = sse; // 연결 객체 저장
};
