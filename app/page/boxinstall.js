import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb';

const BoxInstallPage = () => {
  const { alarmId } = useLocalSearchParams();
  const router = useRouter();

  const handleInstallComplete = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        return;
      }

      // 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;

      // 카메라로 사진 촬영
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
      });

      if (result.canceled) {
        Alert.alert('사진 촬영이 취소되었습니다.');
        return;
      }

      const photo = result.assets[0];

      // FormData 구성
      const formData = new FormData();
      formData.append('longitude', coords.longitude);
      formData.append('latitude', coords.latitude);
      formData.append('file', {
        uri: photo.uri,
        name: 'install_photo.jpg',
        type: 'image/jpeg',
      });

      const token = await AsyncStorage.getItem('usertoken');

      //  설치 완료 API 호출 (INSTALL_COMPLETED)
      await axiosWebInstance.patch(`/employee/installCompleted/${alarmId}`, formData, {
        headers: {
          access: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      //  AsyncStorage에 완료 플래그 저장 (BoxList에서 버튼 활성화 조건용)
      await AsyncStorage.setItem(`completed-${alarmId}`, 'true');

      Alert.alert('설치 완료', '사진과 위치 정보가 전송되었습니다.');

      //  BoxList로 이동하며 상태 전달
      router.push({
        pathname: '/page/boxlist',
        params: { alarmId, type: 'INSTALL_COMPLETED' }, // 변경된 타입 전달
      });

    } catch (error) {
      console.error('설치 완료 처리 실패:', error);
      Alert.alert('오류', '설치 완료 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>설치 완료 처리</Text>

      <TouchableOpacity
        onPress={handleInstallComplete}
        style={{ backgroundColor: '#008CBA', padding: 16, borderRadius: 8 }}
      >
        <Text style={{ color: 'black', fontSize: 16 }}>설치 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BoxInstallPage;
