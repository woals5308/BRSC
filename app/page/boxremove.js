import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb';

const BoxRemovePage = () => {
  const { alarmId } = useLocalSearchParams();
  const router = useRouter();

  const handleRemoveComplete = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
      });

      if (result.canceled) {
        Alert.alert('사진 촬영이 취소되었습니다.');
        return;
      }

      const photo = result.assets[0];

      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        name: 'remove_photo.jpg',
        type: 'image/jpeg',
      });

      const token = await AsyncStorage.getItem('usertoken');

      await axiosWebInstance.patch(`/employee/removeCompleted/${alarmId}`, formData, {
        headers: {
          access: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      await AsyncStorage.setItem(`completed-${alarmId}`, 'true');

      Alert.alert('제거 완료', '사진이 전송되었습니다.');

      //  다음 단계 처리를 위해 타입 전달
      router.push({
        pathname: '/page/boxlist',
        params: { alarmId, type: 'REMOVE_COMPLETED' },
      });

    } catch (error) {
      console.error('제거 완료 처리 실패:', error);
      Alert.alert('오류', '제거 완료 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>제거 완료 처리</Text>

      <TouchableOpacity
        onPress={handleRemoveComplete}
        style={{ backgroundColor: '#e74c3c', padding: 16, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>제거 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BoxRemovePage;
