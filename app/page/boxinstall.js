import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb';
import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';

const BoxInstallPage = () => {
  const { alarmId } = useLocalSearchParams();
  const [unresolvedAlarms] = useUnresolvedAlarms();
  const [alarm, setAlarm] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (alarmId && unresolvedAlarms.length > 0) {
      const found = unresolvedAlarms.find(a => String(a.id) === String(alarmId));
      setAlarm(found);
    }
  }, [alarmId, unresolvedAlarms]);

  const handleInstallComplete = async () => {
    try {
      if (!alarm) return;

      const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
      if (locStatus !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;

      if (!cameraRef.current) {
        Alert.alert('카메라 참조를 찾을 수 없습니다.');
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });

      const formData = new FormData();
      formData.append('longitude', coords.longitude);
      formData.append('latitude', coords.latitude);
      formData.append('file', {
        uri: photo.uri,
        name: 'install_photo.jpg',
        type: 'image/jpeg',
      });

      const token = await AsyncStorage.getItem('usertoken');

      await axiosWebInstance.patch(`/employee/installCompleted/${alarm.id}`, formData, {
        headers: {
          access: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      await AsyncStorage.setItem(`completed-${alarm.id}`, 'true');
      Alert.alert('설치 완료', '사진과 위치 정보가 전송되었습니다.');
      router.replace('/page/boxlist');
    } catch (error) {
      console.error('설치 완료 처리 실패:', error);
      Alert.alert('오류', '설치 처리 중 오류 발생');
    }
  };

  if (!cameraPermission) return <View />;

  if (!cameraPermission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>카메라 권한이 필요합니다.</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.permissionButton}>
          <Text style={styles.permissionText}>권한 요청</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!alarm) {
    return <SafeAreaView><Text>알람 정보를 불러오는 중...</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>설치할 박스 ID: {alarm.boxId} | 타입: {alarm.type}</Text>

<CameraView
  ref={cameraRef}
  style={styles.camera}
  facing="back"  //  문자열 직접 지정
/>

      <TouchableOpacity style={styles.completeButton} onPress={handleInstallComplete}>
        <Text style={styles.buttonText}> 설치 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
  },
  camera: {
    flex: 1,
  },
  completeButton: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  permissionText: {
    color: 'white',
  },
});

export default BoxInstallPage;
