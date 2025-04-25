import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import EventSource from 'react-native-event-source';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/boxalarmstyles';

//이건 첨에 우리가 시도했던 SSE 부분 아마 사용 안할듯함

const AlarmPage = () => {
  const [alarms, setAlarms] = useState([]);
  const [unresolvedAlarms, setUnresolvedAlarms] = useState([]);
  const [acceptedIds, setAcceptedIds] = useState([]);
  const router = useRouter();

  // 미해결 알람 가져오기
  useEffect(() => {
    const fetchUnresolvedAlarms = async () => {
      try {
        const response = await axios.get('http://192.168.0.20:8080/alarm/unResolved');
        if (Array.isArray(response.data)) {
          setUnresolvedAlarms(response.data);
        }
      } catch (error) {
        console.error('❌ 미해결 알람 로딩 실패:', error);
      }
    };
    fetchUnresolvedAlarms();
  }, []);

  // SSE 실시간 알람 수신
  useEffect(() => {
    const eventSource = new EventSource('https://192.168.0.20:8443/SSEsubscribe');

    eventSource.addEventListener('alarm', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📡 수신된 알람:', data);
        setAlarms((prev) => [data, ...prev.filter((a) => a.id !== data.id)]);
      } catch (e) {
        console.error('❌ SSE JSON 파싱 실패:', e);
      }
    });

    eventSource.onerror = (err) => {
      console.error('❌ SSE 연결 오류:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleAccept = async (item) => {
    console.log("방금 직은 메시지")
    console.log(item)
    const { id, name, IPAddress, longitude, latitude, type } = item;

    if (acceptedIds.includes(id)) return;
    setAcceptedIds((prev) => [...prev, id]);
    setUnresolvedAlarms((prev) => prev.filter((a) => a.id !== id));

    try {
      if (type === 'INSTALL_REQUEST') {
        const token = await AsyncStorage.getItem('usertoken');
        console.log("t=수락버튼누른ㅁ언ㅁ4")
        await axios.patch(`http://192.168.0.20:8080/employee/installInProgress/${id}`, {
          headers: {
            access: `Bearer ${token}`,
          },
        });
        router.push({
          pathname: '/boxinstall',
          params: { id, name, IPAddress, longitude, latitude },
        });
      } else if (type === 'REMOVE_REQUEST') {
        await axios.patch(`https://192.168.0.20:8443/employee/removeInProgress/${id}`);
        router.push({
          pathname: '/boxremove',
          params: { id, name, IPAddress, longitude, latitude },
        });
      }
    } catch (error) {
      console.error('요청 수락 실패:', error);
      Alert.alert('오류', '요청 수락 중 문제가 발생했습니다.');
    }
  };

  const renderItem = (item, isRealtime = false) => {
    const isAccepted = acceptedIds.includes(item.id);
    const shouldShowButton = isRealtime
      ? item.type === '설치' || item.type === '제거'
      : true;

    return (
      <View style={[styles.card, isAccepted && styles.acceptedCard]}>
        <Text style={styles.message}>📢 {item.message}</Text>
        {shouldShowButton && (
          <TouchableOpacity
            style={[styles.acceptButton, isAccepted && styles.disabledButton]}
            onPress={() => handleAccept(item)}
            disabled={isAccepted}
          >
            <Text style={styles.acceptText}>
              {isAccepted ? '요청 수락됨' : '요청 수락'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>미해결 알람</Text>
      <FlatList
        data={unresolvedAlarms}
        keyExtractor={(item, index) => `unresolved-${index}`}
        renderItem={({ item }) => renderItem(item, false)}
        scrollEnabled={false}
      />
      <View style={{ height: 30 }} />
      <Text style={styles.sectionHeader}>실시간 수거함 요청</Text>
      <FlatList
        data={alarms}
        keyExtractor={(item, index) => `realtime-${index}`}
        renderItem={({ item }) => renderItem(item, true)}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default AlarmPage;
