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
// ❌ usePolyfill 제거

const NotificationTab = ({ visible, onClose, alarms }) => {
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
    console.log('[NotificationTab] alarms state:', alarms);
  }, [alarms]);

  const formatAlarmMessage = (alarm) => {
    return `📢 [${alarm.type}] 요청\n박스 ID: ${alarm.boxId}\n요청자: ${alarm.userId}\n날짜: ${new Date(alarm.date).toLocaleString()}`;
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
              {alarms && alarms.length > 0 ? (
                alarms.map((alarm, index) => (
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
