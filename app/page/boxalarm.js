import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSSEAlarms } from "../hook/useSSEAlarms";
import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';
import styles from '../style/boxalarmstyles';
import axiosWebInstance from '../api/axiosweb';

const ACCEPTABLE_TYPES = ['INSTALL_REQUEST', 'REMOVE_REQUEST']; // 실제 처리할 타입

const AlarmPage = () => {
  const alarms = useSSEAlarms();
  const [unresolvedAlarms, setUnresolvedAlarms] = useUnresolvedAlarms();
  const [acceptedIds, setAcceptedIds] = useState([]);
  const router = useRouter();

  const handleAccept = async (item) => {
    console.log("1")
    console.log(item)
    const { id, name, IPAddress, longitude, latitude, type } = item;

    if (acceptedIds.includes(id)) return;
    
    setAcceptedIds(prev => [...prev, id]);
    setUnresolvedAlarms(prev => prev.filter(a => a.id !== id));
    try {
      if (type === 'INSTALL_REQUEST') {
        console.log("2")

        const token = await AsyncStorage.getItem("usertoken");
        console.log(token);
        await axiosWebInstance.patch(`http://192.168.0.20:8080/employee/installInProgress/${id}`, null,
          {
          headers: {
            access: `Bearer ${token}`,
          },
        });

        console.log("333")
        
        router.push({ pathname: '/page/boxinstall', params: { id, name, IPAddress, longitude, latitude } });
      } else if (type === 'REMOVE_REQUEST') {
        await axiosWebInstance.patch(`http://192.168.0.20:8080/employee/removeInProgress/${id}`);
        router.push({ pathname: '/page/boxremove', params: { id, name, IPAddress, longitude, latitude } });
      }
    } catch (error) {
      console.error('요청 수락 실패:', error);
      Alert.alert('오류', '요청 수락 중 문제가 발생했습니다.');
    }
  };

  const renderItem = (item, isRealtime = false) => {
    const isAccepted = acceptedIds.includes(item.id);
    const shouldShowButton = isRealtime
      ? ACCEPTABLE_TYPES.includes(item.type)
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
