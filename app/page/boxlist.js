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
  const { alarmId, type } = useLocalSearchParams(); // 전달된 알람 정보
  const router = useRouter();

  const [completed, setCompleted] = useState(false);     // 사진+위치 전송 완료
  const [finalized, setFinalized] = useState(false);     // 최종 완료 여부

  useEffect(() => {
    const checkCompletion = async () => {
      const done = await AsyncStorage.getItem(`completed-${alarmId}`);
      if (done === 'true') setCompleted(true);
    };
    checkCompletion();
  }, []);

  //  최종 완료 API 경로 반환
  const getFinalEndpoint = (type, alarmId) => {
    switch (type) {
      case 'INSTALL_CONFIRMED':
        return `/employee/installEnd/${alarmId}`;
      case 'REMOVE_CONFIRMED':
        return `/employee/removeEnd/${alarmId}`;
      default:
        return null;
    }
  };

  //  최종 완료 처리
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

      Alert.alert('최종 완료', '수거 작업이 완료되었습니다.');
      setFinalized(true);

    } catch (error) {
      console.error('최종 완료 실패:', error);
      Alert.alert('오류', '완료 처리 중 문제가 발생했습니다.');
    }
  };

  // 사진+위치 전송 페이지 이동
  const handleBoxSelect = () => {
    if (type === 'INSTALL_IN_PROGRESS') {
      router.push({ pathname: '/page/boxinstall', params: { alarmId } });
    } else if (type === 'REMOVE_IN_PROGRESS') {
      router.push({ pathname: '/page/boxremove', params: { alarmId } });
    } else {
      Alert.alert('이동할 수 없는 요청 상태입니다.');
    }
  };

  // 알람 타입 설명 텍스트
  const getTypeLabel = () => {
    switch (type) {
      case 'INSTALL_IN_PROGRESS':
        return '설치 진행 중';
      case 'INSTALL_CONFIRMED':
        return '설치 확정됨';
      case 'REMOVE_IN_PROGRESS':
        return '제거 진행 중';
      case 'REMOVE_CONFIRMED':
        return '제거 확정됨';
      default:
        return '알 수 없는 요청';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>요청된 수거함</Text>

        <View style={styles.card}>
          <Text style={styles.itemTitle}>박스 ID: {alarmId}</Text>
          <Text style={styles.itemSubTitle}>요청 타입: {getTypeLabel()}</Text>

          {(type === 'INSTALL_IN_PROGRESS' || type === 'REMOVE_IN_PROGRESS') && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleBoxSelect}
            >
              <Text style={styles.acceptText}>
                {type.startsWith('INSTALL') ? '사진 및 위치 전송' : '사진 전송'}
              </Text>
            </TouchableOpacity>
          )}

          {(type === 'INSTALL_CONFIRMED' || type === 'REMOVE_CONFIRMED') && (
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoxListPage;
