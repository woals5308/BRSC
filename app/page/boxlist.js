import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb';
import styles from '../style/boxalarmstyles';

const BoxListPage = () => {

const { alarmId, name, IPAddress, longitude, latitude, type, boxId } = useLocalSearchParams();
console.log('[BoxListPage] params:', {
  alarmId,
  name,
  IPAddress,
  longitude,
  latitude,
  type,
  boxId,
});

  const router = useRouter();
  useEffect(() => {
  console.log('[BoxListPage] params:', { alarmId, type, boxId, name, longitude, latitude });
}, []);
  const [completed, setCompleted] = useState(false);
  const [finalized, setFinalized] = useState(false);

  useEffect(() => {
    const checkCompletion = async () => {
      const done = await AsyncStorage.getItem(`completed-${alarmId}`);
      if (done === 'true') setCompleted(true);
    };
    checkCompletion();
  }, [alarmId]);

  const getFinalEndpoint = (type, alarmId) => {
    switch (type) {
      case 'INSTALL_CONFIRMED':
        return `/employee/installEnd/${alarmId}`;
      case 'REMOVE_CONFIRMED':
        return `/employee/removeEnd/${alarmId}`;
      case 'COLLECTION_CONFIRMED':
        return `/employee/collectioneEnd/${alarmId}`;
      default:
        return null;
    }
  };
  console.log('[BoxListPage] params:', { alarmId, type, boxId, name, longitude, latitude });

  const handleFinalComplete = async () => {
    try {
      const token = await AsyncStorage.getItem('usertoken');
      const endpoint = getFinalEndpoint(type, alarmId);
      if (!endpoint) {
        Alert.alert('오류', '지원하지 않는 요청 상태입니다.');
        return;
      }

      await axiosWebInstance.patch(endpoint, null, {
        headers: { access: `Bearer ${token}` },
      });

      Alert.alert('최종 완료', '작업이 완료되었습니다.');
      setFinalized(true);
      router.replace('/page/boxlist'); // 목록 갱신을 위해 새로고침

    } catch (error) {
      console.error('최종 완료 실패:', error);
      Alert.alert('오류', '완료 처리 중 문제가 발생했습니다.');
    }
  };

  const handleInstallOrRemove = () => {
    if (type === 'INSTALL_IN_PROGRESS') {
      router.push({ pathname: '/page/boxinstall', params: { alarmId } });
    } else if (type === 'REMOVE_IN_PROGRESS') {
      router.push({ pathname: '/page/boxremove', params: { alarmId } });
    }
  };

  const handleCollection = () => {
    router.push({
      pathname: '/page/QR',
      params: {
        alarmId,
        boxId,
      },
    });
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'INSTALL_IN_PROGRESS':
        return '설치 진행 중';
      case 'REMOVE_IN_PROGRESS':
        return '제거 진행 중';
      case 'COLLECTION_IN_PROGRESS':
        return '수거 진행 중';
      case 'INSTALL_CONFIRMED':
        return '설치 확정됨';
      case 'REMOVE_CONFIRMED':
        return '제거 확정됨';
      case 'COLLECTION_CONFIRMED':
        return '수거 확정됨';
      default:
        return '알 수 없는 요청';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>요청된 수거함</Text>

        {/* 설치/제거 흐름 */}
        {(type === 'INSTALL_IN_PROGRESS' || type === 'REMOVE_IN_PROGRESS') && (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>장소명: {name}</Text>
            <Text style={styles.itemSubTitle}>요청 타입: {getTypeLabel()}</Text>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleInstallOrRemove}
            >
              <Text style={styles.acceptText}>사진 및 위치 전송</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 최종 완료 버튼 */}
        {(type === 'INSTALL_CONFIRMED' || type === 'REMOVE_CONFIRMED' || type === 'COLLECTION_CONFIRMED') && (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>장소명: {name}</Text>
            <Text style={styles.itemSubTitle}>요청 타입: {getTypeLabel()}</Text>
            <TouchableOpacity
              style={[
                styles.acceptButton,
                (!completed || finalized) && { backgroundColor: '#ccc' },
              ]}
              onPress={handleFinalComplete}
              disabled={!completed || finalized}
            >
              <Text style={styles.acceptText}>
                {finalized ? '완료됨' : '최종 완료'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 수거 흐름 */}
        {type === 'COLLECTION_IN_PROGRESS' && (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>박스 ID: {boxId}</Text>
            <Text style={styles.itemSubTitle}>요청 타입: 수거 진행 중</Text>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleCollection}
            >
              <Text style={styles.acceptText}>QR 스캔하여 수거함 열기</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoxListPage;
