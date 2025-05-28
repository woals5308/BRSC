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
import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';
import BottomNavigation from '../components/BottomNavigation';

const BoxListPage = () => {
  const [unresolvedAlarms, fetchAlarms] = useUnresolvedAlarms(); //  fetchAlarms 추가
  const [inProgressAlarms, setInProgressAlarms] = useState([]);
  const [completedMap, setCompletedMap] = useState({});
  const [finalizedMap, setFinalizedMap] = useState({});
  const router = useRouter();
  const {alarmId,boxId,type} = useLocalSearchParams();

  console.log(alarmId,boxId,type);
  useEffect(() => {
    const filtered = unresolvedAlarms.filter(alarm =>
      [
        'INSTALL_IN_PROGRESS',
        'REMOVE_IN_PROGRESS',
        'COLLECTION_IN_PROGRESS',
        'INSTALL_CONFIRMED',
        'REMOVE_CONFIRMED',
        'COLLECTION_CONFIRMED',
        'FIRE_IN_PROGRESS',
        'FIRE_CONFIRMED',
        
      ].includes(alarm.type)
    );
    setInProgressAlarms(filtered);
  }, [unresolvedAlarms]);

  useEffect(() => {
    const checkCompletion = async () => {
      const newMap = {};
      for (const item of inProgressAlarms) {
        const done = await AsyncStorage.getItem(`completed-${item.id}`);
        if (done === 'true') newMap[item.id] = true;
      }
      setCompletedMap(newMap);
    };
    checkCompletion();
  }, [inProgressAlarms]);

  const getFinalEndpoint = (type, alarmId) => {
    switch (type) {
      case 'INSTALL_CONFIRMED': return `/employee/installEnd/${alarmId}`;
      case 'REMOVE_CONFIRMED': return `/employee/removeEnd/${alarmId}`;
      case 'COLLECTION_CONFIRMED': return `/employee/collectioneEnd/${alarmId}`;
      case 'FIRE_CONFIRMED' : return `/employee/fireEnd/${alarmId}`;
      default: return null;
    }
  };

  const handleFinalComplete = async (item) => {
    try {
      const token = await AsyncStorage.getItem('usertoken');
      const endpoint = getFinalEndpoint(item.type, item.id);
      if (!endpoint) {
        Alert.alert('오류', '지원하지 않는 요청 상태입니다.');
        return;
      }

      await axiosWebInstance.patch(endpoint, null, {
        headers: { access: `Bearer ${token}` },
      });

      Alert.alert('최종 완료', '작업이 완료되었습니다.');
      setFinalizedMap(prev => ({ ...prev, [item.id]: true }));

      //  새로고침
      await fetchAlarms();
    } catch (error) {
      console.error('최종 완료 실패:', error);
      Alert.alert('오류', '완료 처리 중 문제가 발생했습니다.');
    }
  };

  const handleInstallOrRemove = (item) => {
    const route = item.type === 'INSTALL_IN_PROGRESS' ? '/page/boxinstall' : '/page/boxremove';
    router.push({ pathname: route, params: { alarmId: String(item.id) } });
  };

  const handleCollection = (item) => {
    router.push({ pathname: '/page/QR', params: { alarmId: String(item.id) } });
  };

  const handleFire = (item) => {
  router.push({ pathname: '/page/boxfire', params: { alarmId: String(item.id) } });
};




  const getTypeLabel = (type) => {
    switch (type) {
      case 'INSTALL_IN_PROGRESS': return '설치 진행 중';
      case 'REMOVE_IN_PROGRESS': return '제거 진행 중';
      case 'COLLECTION_IN_PROGRESS': return '수거 진행 중';
      case 'INSTALL_CONFIRMED': return '설치 최종 확인';
      case 'REMOVE_CONFIRMED': return '제거 최종 확인';
      case 'COLLECTION_CONFIRMED': return '수거 최종 확인';
      case 'FIRE_IN_PROGRESS': return '화재 처리 중';
      case 'FIRE_COMPLETED': return '화재 처리 완료';
      case 'FIRE_CONFIRMED' : return '화재 최종 완료';
      default: return '알 수 없는 요청';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeader}>요청된 수거함</Text>

        {inProgressAlarms.length === 0 && (
          <Text>진행 중인 알람이 없습니다.</Text>
        )}

        {inProgressAlarms.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.itemTitle}>박스 ID: {item.boxId}</Text>
            <Text style={styles.itemSubTitle}>요청 타입: {getTypeLabel(item.type)}</Text>

            {/* 사진 및 위치 전송 버튼 */}
            {(item.type === 'INSTALL_IN_PROGRESS' || item.type === 'REMOVE_IN_PROGRESS') && (
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleInstallOrRemove(item)}
              >
                <Text style={styles.acceptText}>사진 및 위치 전송</Text>
              </TouchableOpacity>
            )}

            {/* QR 스캔 버튼 */}
            {item.type === 'COLLECTION_IN_PROGRESS' && (
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleCollection(item)}
              >
                <Text style={styles.acceptText}>QR 스캔하여 수거함 열기</Text>
              </TouchableOpacity>
            )}

              {/* 화재 처리하기 버튼 */}
              {item.type === 'FIRE_IN_PROGRESS' && (
              <TouchableOpacity
                style={styles.acceptButton}
                    onPress={() => handleFire(item)}
              > 
                <Text style={styles.acceptText}>화재 처리하기</Text>
              </TouchableOpacity>
            )}            

            {/* 최종 완료 버튼 */}
            {item.type.endsWith('_CONFIRMED') && (
              <TouchableOpacity
                style={[
                  styles.acceptButton,
                  (!completedMap[item.id] || finalizedMap[item.id]) && { backgroundColor: '#ccc' },
                ]}
                onPress={() => handleFinalComplete(item)}
                disabled={!completedMap[item.id] || finalizedMap[item.id]}
              >
                <Text style={styles.acceptText}>
                  {finalizedMap[item.id] ? '완료됨' : '최종 완료'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <BottomNavigation/>
    </SafeAreaView>
  );
};

export default BoxListPage;
