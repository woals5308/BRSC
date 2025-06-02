import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import styles from '../style/alarmstyles';
import { useAlarm } from '../context/AlarmContext';
import { useRouter } from 'expo-router';

// 알람 타입 한글 매핑
const TYPE_LABELS = {
  COLLECTION_NEEDED: '수거 필요',
  COLLECTION_RECOMMENDED: '수거 권장',
  COLLECTION_IN_PROGRESS: '수거 진행 중',
  COLLECTION_COMPLETED: '수거 완료',
  COLLECTION_CONFIRMED: '수거 확정',
  FIRE: '화재 발생',
  FIRE_IN_PROGRESS: '화재 처리 중',
  FIRE_COMPLETED: '화재 처리 완료',
  FIRE_CONFIRMED: '화재 처리 확정',
  INSTALL_REQUEST: '설치 요청',
  INSTALL_IN_PROGRESS: '설치 진행 중',
  INSTALL_COMPLETED: '설치 완료',
  INSTALL_CONFIRMED: '설치 확정',
  REMOVE_REQUEST: '제거 요청',
  REMOVE_IN_PROGRESS: '제거 진행 중',
  REMOVE_COMPLETED: '제거 완료',
  REMOVE_CONFIRMED: '제거 확정',
};

const NotificationTab = ({ visible, onClose }) => {
  const { alarmList, unresolvedAlarms, markAllAsRead } = useAlarm();
  const router = useRouter();
  const translateX = useRef(new Animated.Value(300)).current;
  const hasOpened = useRef(false);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: visible ? 0 : 300,
      useNativeDriver: true,
    }).start();

    if (visible && !hasOpened.current) {
      markAllAsRead();
      hasOpened.current = true;
    } else if (!visible) {
      hasOpened.current = false;
    }
  }, [visible]);

  const handleOutsidePress = () => {
    onClose();
  };

  const formatAlarmMessage = (alarm) => {
    const typeLabel = TYPE_LABELS[alarm.type] || alarm.type;
    return `[${typeLabel}]\n박스 ID: ${alarm.boxId}\n날짜: ${new Date(alarm.date).toLocaleString()}`;
  };

  const handleAlarmPress = (alarm) => {
    onClose();

    InteractionManager.runAfterInteractions(() => {
      const isConfirmedOrInProgress =
        alarm.type.endsWith('_CONFIRMED') || alarm.type.endsWith('_IN_PROGRESS');

      const pathname = isConfirmedOrInProgress ? '/page/boxlist' : '/page/boxalarm';

      router.push({
        pathname,
        params: {
          alarmId: String(alarm.id),
          boxId: String(alarm.boxId),
          type: alarm.type,
        },
      });
    });
  };

  // 실시간 + 미해결 알람 병합 (중복 제거)
  const combinedAlarmsMap = new Map();
  [...(alarmList || []), ...(unresolvedAlarms || [])].forEach((alarm) => {
    combinedAlarmsMap.set(alarm.id, alarm);
  });
  const combinedAlarms = Array.from(combinedAlarmsMap.values());

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.tab, { transform: [{ translateX }] }]}>
            <View style={styles.tabHeader}>
              <Text style={styles.tabTitle}>실시간 알림</Text>
            </View>

            <ScrollView style={styles.notificationContent}>
              {combinedAlarms.length > 0 ? (
                combinedAlarms.map((alarm) => (
                  <TouchableOpacity
                    key={alarm.id}
                    onPress={() => handleAlarmPress(alarm)}
                    style={styles.messageBox}
                  >
                    <Text style={styles.message}>
                      {formatAlarmMessage(alarm)}
                    </Text>
                  </TouchableOpacity>
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
