import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter ,useEffect} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm'; // 미해결 알람 리스트 훅
import axiosWebInstance from '../api/axiosweb'; // axios 인스턴스
import styles from '../style/boxalarmstyles'; // 스타일
// === 여기에 타입별 한글 정의할 꺼임
const TYPE_LABELS ={
  INSTALL_REQUEST : '설치 요청',
  REMOVE_REQUEST : '제거 요청',
  COLLECTION_RECOMMNDED : '수거 권장',
};





const AlarmPage = () => {
  const [unresolvedAlarms, setUnresolvedAlarms] = useUnresolvedAlarms(); // 미해결 알람 목록
  const [acceptedIds, setAcceptedIds] = useState([]); // 수락한 알람 ID 목록
  const router = useRouter();

  // 설치 요청(INSTALL_REQUEST), 제거 요청(REMOVE_REQUEST)만 필터링하여 표시
  const filteredAlarms = unresolvedAlarms.filter(alarm =>[
    'INSTALL_REQUEST' , 'REMOVE_REQUEST' , 'COLLECTION_RECOMMENDED'].includes(alarm.type)
  );

    console.log('[AlarmPage] 미해결 알람 목록:', unresolvedAlarms);
    
  // 알람 수락 시 실행되는 함수
  const handleAccept = async (item) => {
    const { id, name, IPAddress, longitude, latitude, type, boxId} = item;

    // 이미 수락한 경우 중복 실행 방지
    if (acceptedIds.includes(id)) return;

    // 수락된 알람 ID 저장 및 화면에서 제거
    setAcceptedIds((prev) => [...prev, id]);
    setUnresolvedAlarms((prev) => prev.filter((a) => a.id !== id));

    try {
      const token = await AsyncStorage.getItem('usertoken'); // JWT 토큰 불러오기

      // 알람 타입에 따라 API 요청 전송
      if (type === 'INSTALL_REQUEST') {
        await axiosWebInstance.patch(`/employee/installInProgress/${id}`, null, {
          headers: { access: `Bearer ${token}` },
        });
      } else if (type === 'REMOVE_REQUEST') {
        await axiosWebInstance.patch(`/employee/removeInProgress/${id}`, null, {
          headers: { access: `Bearer ${token}` },
        });
      }else if (type === 'COLLECTION_RECOMMENDED'){
        await axiosWebInstance.patch(`/employee/collectionInProgress/${id}`,null , {
          headers: {access: `Bearer ${token}`},
        })
      }

      
      router.push({
        pathname:'page/boxlist',
 params: {
      alarmId:  id.toString(),    // id는 number라 문자열로 변환
      name:     name,             // 이미 string 타입
      IPAddress: IPAddress,       // 이미 string 타입
      longitude: longitude.toString(), // number → string
      latitude:  latitude.toString(),  // number → string
      type:     type,             // enum 혹은 string
      boxId:    boxId.toString(), // number → string
    },
      });


    } catch (error) {
      console.error('요청 수락 실패:', error);
      Alert.alert('오류', '요청 처리 중 문제가 발생했습니다.');
    }
  };

  // 개별 알람 카드 렌더링 함수
  const renderItem = ({ item }) => {
    const isAccepted = acceptedIds.includes(item.id);
    const label = TYPE_LABELS[item.type] || '알 수 없는 요청띠';

    return (
      <View style={styles.card}>
        <Text style={styles.itemTitle}>박스 ID: {item.type}</Text>
        <Text style={styles.itemSubTitle}>
          요청 타입: {label}
        </Text>
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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>미해결 알람</Text>
        <View style={styles.listContainer}>
          
          <FlatList
            data={filteredAlarms} // 수거요청만 보여줌
            keyExtractor={(item) => `unresolved-${item.id}`}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlarmPage;
