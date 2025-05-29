import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styles from '../style/alarmstyles';
import { useAlarm } from '../context/AlarmContext'; // ✅ 알람 상태 가져오기

const TYPE_LABELS = {
  INSTALL_REQUEST: '설치 요청',
  REMOVE_REQUEST: '제거 요청',
  COLLECTION_RECOMMENDED: '수거 권장',
  FIRE: '화재 발생',
  INSTALL_CONFIRMED : '설치 완료',
  REMOVE_CONFIRMED : '제거 완료',
  COLLECTION_CONFIRMED : '수거 완료',
  FIRE_CONFIRMED : '화재 처리 완료',



};

const NotificationTab = ({ visible, onClose }) => {
  const { alarmList } = useAlarm(); // ✅ 전역 알림 상태 사용
  const translateX = useRef(new Animated.Value(300)).current;

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

  useEffect(() => {
    console.log('[NotificationTab] alarms state:', alarmList);
  }, [alarmList]);

  const formatAlarmMessage = (alarm) => {
    const typeLabel = TYPE_LABELS[alarm.type] || alarm.type;
    return `[${typeLabel}] \n박스 ID: ${alarm.boxId}\n요청자: ${alarm.userId}\n날짜: ${new Date(alarm.date).toLocaleString()}`;
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.tab, { transform: [{ translateX }] }]}>
            <View style={styles.tabHeader}>
              <Text style={styles.tabTitle}>실시간 알림</Text>
            </View>

            <ScrollView style={styles.notificationContent}>
              {alarmList && alarmList.length > 0 ? (
                alarmList.map((alarm, index) => (
                  <View key={index} style={styles.messageBox}>
                    <Text style={styles.message}>
                      {formatAlarmMessage(alarm)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.message}>알림이 없습니다.</Text>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationTab;
