import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';
import axiosWebInstance from '../api/axiosweb';
import styles from '../style/boxalarmstyles';
import BottomNavigation from '../components/BottomNavigation';
import AlarmIcon from '../components/AlarmIcon';
import NotificationTab from './alarm'; // 경로 맞춰주세요
import useBackHandler from '../hook/usebackHandler';



const TYPE_LABELS = {
  INSTALL_REQUEST: '설치 요청',
  REMOVE_REQUEST: '제거 요청',
  COLLECTION_RECOMMENDED: '수거 권장',
  COLLECTION_NEEDED: '수거 필요',
  FIRE: '화재 발생',
};

const AlarmPage = () => {
//   useBackHandler(() => {
//   return true; // true를 반환하면 뒤로 가기 막힘
// });
  const [unresolvedAlarms, fetchAlarms] = useUnresolvedAlarms();
  const [acceptedIds, setAcceptedIds] = useState([]);
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);
  const router = useRouter();
  const { alarmId } = useLocalSearchParams(); // 선택된 알람 ID

  const filteredAlarmsRaw = unresolvedAlarms.filter(alarm =>
    ['INSTALL_REQUEST', 'REMOVE_REQUEST', 'COLLECTION_RECOMMENDED', 'FIRE', 'COLLECTION_NEEDED'].includes(alarm.type)
  );

  //  선택된 알람이 있다면 최상단으로 올림
  const filteredAlarms = React.useMemo(() => {
    if (!alarmId) return filteredAlarmsRaw;
    const index = filteredAlarmsRaw.findIndex((alarm) => String(alarm.id) === String(alarmId));
    if (index === -1) return filteredAlarmsRaw;
    const [target] = filteredAlarmsRaw.splice(index, 1);
    return [target, ...filteredAlarmsRaw];
  }, [filteredAlarmsRaw, alarmId]);

  const handleAccept = async (item) => {
    const { id, type, boxId } = item;
    if (acceptedIds.includes(id)) return;

    setAcceptedIds(prev => [...prev, id]);

    try {
      const token = await AsyncStorage.getItem('usertoken');
      let endpoint = '';

      if (type === 'INSTALL_REQUEST') {
        endpoint = `/employee/installInProgress/${id}`;
      } else if (type === 'REMOVE_REQUEST') {
        endpoint = `/employee/removeInProgress/${id}`;
      } else if (type === 'COLLECTION_RECOMMENDED' || type === 'COLLECTION_NEEDED') {
        endpoint = `/employee/collectionInProgress/${id}`;
      } else if (type === 'FIRE') {
        endpoint = `/employee/fireInProgress/${id}`;
      }

      await axiosWebInstance.patch(endpoint, null, {
        headers: { access: `Bearer ${token}` },
      });

      await fetchAlarms();

      router.push({
        pathname: '/page/boxlist',
        params: {
          alarmId: String(id),
          boxId: String(boxId),
          type: String(type),
        },
      });
    } catch (error) {
      console.error('요청 수락 실패:', error);
      Alert.alert('오류', '요청 처리 중 문제가 발생했습니다.');
    }
  };

  const renderItem = ({ item }) => {
    const isAccepted = acceptedIds.includes(item.id);
    const label = TYPE_LABELS[item.type] || '알 수 없는 요청';

    return (
      <View style={styles.card}>
        <Text style={styles.itemTitle}>박스 ID: {item.boxId}</Text>
        <Text style={styles.itemSubTitle}>요청 타입: {label}</Text>
        <Text style={styles.message}>{item.message}</Text>

        <TouchableOpacity
          style={[styles.acceptButton, isAccepted && styles.disabledButton]}
          onPress={() => handleAccept(item)}
          disabled={isAccepted}
        >
          <Text style={styles.acceptText}>
            {isAccepted ? `${label}됨` : `${label} 수락`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>미해결 알람</Text>
        <View style={styles.notificationWrapper}>
          <AlarmIcon onPress={() => setNotificationTabVisible(true)} />
        </View>
      </View>

      <NotificationTab
        visible={isNotificationTabVisible}
        onClose={() => setNotificationTabVisible(false)}
      />

      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={filteredAlarms}
        keyExtractor={(item) => `unresolved-${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default AlarmPage;
