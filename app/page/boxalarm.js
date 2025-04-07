import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import EventSource from 'react-native-event-source';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AlarmPage = () => {
  const [alarms, setAlarms] = useState([]);
  const [acceptedIds, setAcceptedIds] = useState([]);
  const router = useRouter();

  // ✅ 실시간 알림 수신 (SSE)
  useEffect(() => {
    const eventSource = new EventSource('https://192.168.0.20:8443/SSEsubscribe');

    eventSource.addEventListener('alarm', (event) => {
      const data = JSON.parse(event.data);
      console.log('📩 수신된 알람:', data);
      setAlarms((prev) => [data, ...prev.filter(a => a.id !== data.id)]); // 중복 제거 후 추가
    });

    eventSource.onerror = (err) => {
      console.error('SSE 연결 오류:', err);
    };

    return () => eventSource.close();
  }, []);

  // ✅ 알림 수락 시 처리
  const handleAccept = async (item) => {
    const { id, name, IPAddress, longitude, latitude, type } = item;

    if (acceptedIds.includes(id)) return; // 중복 방지
    setAcceptedIds(prev => [...prev, id]);

    try {
      if (type === '설치') {
        await axios.patch(`https://192.168.0.20:8443/employee/installInProgress/${id}`);
        router.push({
          pathname: '/boxinstall',
          params: { id, name, IPAddress, longitude, latitude },
        });
      } else if (type === '제거') {
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

  // ✅ 알림 UI 렌더링
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.message}>📢 {item.message}</Text>
      {(item.type === '설치' || item.type === '제거') && (
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAccept(item)}
          disabled={acceptedIds.includes(item.id)}
        >
          <Text style={styles.acceptText}>
            {acceptedIds.includes(item.id) ? '요청 수락됨' : '요청 수락'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔔 실시간 수거함 요청</Text>
      <FlatList
        data={alarms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default AlarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    left:60,
    top:30,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
