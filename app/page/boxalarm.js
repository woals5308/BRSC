import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm'; // ✅ fetchAlarms 지원 훅
import axiosWebInstance from '../api/axiosweb';
import styles from '../style/boxalarmstyles';

const TYPE_LABELS = {
  INSTALL_REQUEST: '설치 요청',
  REMOVE_REQUEST: '제거 요청',
  COLLECTION_RECOMMENDED: '수거 권장',
  FIRE : '화재 발생',
};

const AlarmPage = () => {
  const [unresolvedAlarms, fetchAlarms] = useUnresolvedAlarms(); // ✅ fetchAlarms 추가
  const [acceptedIds, setAcceptedIds] = useState([]);
  const router = useRouter();
  const filteredAlarms = unresolvedAlarms.filter(alarm =>
    ['INSTALL_REQUEST', 'REMOVE_REQUEST', 'COLLECTION_RECOMMENDED','FIRE'].includes(alarm.type)
  );

  console.log('[AlarmPage] 미해결 알람 목록:', unresolvedAlarms);

  const handleAccept = async (item) => {
    const { id, type, boxId } = item;
    if (acceptedIds.includes(id)) return;

    setAcceptedIds((prev) => [...prev, id]);

    try {
      const token = await AsyncStorage.getItem('usertoken');

      if (type === 'INSTALL_REQUEST') {
        await axiosWebInstance.patch(`/employee/installInProgress/${id}`, null, {
          headers: { access: `Bearer ${token}` },
        });
      } else if (type === 'REMOVE_REQUEST') {
        await axiosWebInstance.patch(`/employee/removeInProgress/${id}`, null, {
          headers: { access: `Bearer ${token}` },
        });
      } else if (type === 'COLLECTION_RECOMMENDED') {
        await axiosWebInstance.patch(`/employee/collectionInProgress/${id}`, null, {
          headers: { access: `Bearer ${token}` },
        });
      } else if (type === 'FIRE_IN_PROGRESS') {
        await axiosWebInstance.patch(`/employee/fireInProgress/${id}`, null, {
          headers: { access: `Bearer ${token}` },
        });
      }

      // ✅ 상태 새로고침 (setUnresolvedAlarms 제거됨)
      await fetchAlarms();

      // ✅ 수락 후 boxlist 페이지로 이동
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
      <Text style={styles.sectionHeader}>미해결 알람</Text>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={filteredAlarms}
        keyExtractor={(item) => `unresolved-${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AlarmPage;
