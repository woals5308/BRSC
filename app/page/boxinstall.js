import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity , Alert, Touchable } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const BoxInstallScreen = () => {
  const [location, setLocation] = useState(null);
  const params = useLocalSearchParams();
  const router = useRouter();

  const { id, name, IPAddress } = params;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
    })();
  }, []);

  const handleInstallComplete = async () => {
    if (!location) {
      Alert.alert('위치 정보를 가져올 수 없습니다.');
      return;
    }

    try {
      await axios.patch(`http://192.168.0.20:8080/employee/installCompleted/${id}`, {
        name,
        IPAddress,
        longitude: location.longitude,
        latitude: location.latitude,
      });

      Alert.alert('설치 완료!', '수거함 설치가 완료되었습니다.');
      router.back();
    } catch (error) {
      console.error('설치 완료 오류:', error);
      Alert.alert('에러', '설치 완료 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 수거함 설치</Text>
      <Text>이름: {name}</Text>
      <Text>IP 주소: {IPAddress}</Text>

      {location && (
        <View style={{ marginTop: 20 }}>
          <Text> 위도: {location.latitude}</Text>
          <Text> 경도: {location.longitude}</Text>
          <TouchableOpacity title="설치 완료" onPress={handleInstallComplete} color="#4CAF50" />
        </View>
      )}
    </View>
  );
};

export default BoxInstallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
