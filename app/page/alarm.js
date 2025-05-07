import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import styles from '../style/alarmstyles';
import { usePolyfill } from '../hook/usePolyfill';  //기존의 쓰던 3번째 줄 지우고 이걸로 가져오면됨

const NotificationTab = ({ visible, onClose }) => {
  const alarms = usePolyfill(); //여기 부분을 useSSEAlarms 부분을 usePolyfill로 바꾸면됨됨
  const latestMessage = (alarms && alarms.length > 0 ) ? alarms[0].message : '알림이 없습니다.';
  const translateX = useRef(new Animated.Value(300)).current;

  // 슬라이딩 애니메이션
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: visible ? 0 : 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleOutsidePress = () => {
    console.log('알림 외부 탭 → 탭 닫기');
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.tab, { transform: [{ translateX }] }]}>
            <View style={styles.tabHeader}>
              <Text style={styles.tabTitle}>실시간 알림</Text>
            </View>

            <View style={styles.notificationContent}>
              <Text style={styles.message}>
                {latestMessage}
              </Text>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationTab;
