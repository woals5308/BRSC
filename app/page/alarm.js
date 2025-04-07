import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import EventSource from 'react-native-event-source'; // SSE 라이브러리 임포트
import styles from '../style/alarmstyles';

const NotificationTab = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const translateX = new Animated.Value(300); // 탭의 초기 위치 (오른쪽에서 나옴)

  useEffect(() => {
    
    console.log('📡 [SSE] 연결 시도 중...1');
    // 서버의 SSE 엔드포인트 구독
    const eventSource = new EventSource('https://192.168.0.20:8443/SSEsubscribe');
    console.log('📡 [SSE] 연결 시도 중...2');

    eventSource.onopen = () => {
      console.log('✅ [SSE] 연결 성공!');
    };

    // "alarm" 이벤트 수신 시
    eventSource.addEventListener("alarm", (event) => {
      console.log("📨 [SSE] alarm 이벤트 수신됨:", event);
      try {
        const alarmData = JSON.parse(event.data);
        console.log("📦 [SSE] 파싱된 데이터:", alarmData);
        setMessage(alarmData.message);
      } catch (err) {
        console.error("❌ [SSE] JSON 파싱 실패:", err);
      }
    });

    // 기본 메시지 수신 로그 (event: 생략 시 이걸로 수신됨)
    eventSource.onmessage = (event) => {
      console.log("📨 [SSE] 기본 메시지 수신:", event.data);
    };

    // 오류 처리
    eventSource.onerror = (error) => {
      console.error("❌ [SSE] 연결 오류:", error);
    };

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      console.log('🛑 [SSE] 연결 종료');
      eventSource.close();
    };
  }, []);

  // 슬라이딩 애니메이션
  useEffect(() => {
    if (visible) {
      console.log('🎬 알림 탭 열림 애니메이션 시작');
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      console.log('🎬 알림 탭 닫힘 애니메이션 시작');
      Animated.spring(translateX, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleOutsidePress = () => {
    console.log('👆 알림 외부 탭 → 탭 닫기');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.tab, { transform: [{ translateX }] }]}
          >
            <View style={styles.tabHeader}>
              <Text style={styles.tabTitle}>실시간 알림</Text>
            </View>

            <View style={styles.notificationContent}>
              <Text style={styles.message}>
                {message || '알림이 없습니다.'}
              </Text>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationTab;
