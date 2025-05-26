
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb';
import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';

const FireHandlePage = () => {
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

  const handleFireComplete = async () => {
    try {
      if (!alarm) return;

      if (!cameraRef.current) {
        Alert.alert('카메라 참조를 찾을 수 없습니다.');
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });

      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        name: 'fire_photo.jpg',
        type: 'image/jpeg',
      });

      const token = await AsyncStorage.getItem('usertoken');

      await axiosWebInstance.patch(`/employee/fireCompleted/${alarm.id}`, formData, {
        headers: {
          access: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      await AsyncStorage.setItem(`completed-${alarm.id}`, 'true');
      Alert.alert('처리 완료', '화재 사진이 전송되었습니다.');
      router.push('/page/boxlist');
    } catch (error) {
      console.error('화재 처리 실패:', error);
      Alert.alert('오류', '화재 처리 중 오류 발생');
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
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      />
      <TouchableOpacity style={styles.completeButton} onPress={handleFireComplete}>
        <Text style={styles.buttonText}>화재 처리 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  completeButton: {
    backgroundColor: '#d9534f', // 빨간 버튼
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

export default FireHandlePage;
