import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb'; // 웹 백엔드용 axios 인스턴스
import { requestBoxClose } from '../api/cameraApi'; // 문 닫기 API 호출
import styles from '../style/QRstyles';

const CollectionCompleteScreen = () => {
  const { alarmId, boxId } = useLocalSearchParams(); // QR로 전달받은 알람 ID, 박스 ID
  const [image, setImage] = useState(null);
  const router = useRouter();

  //  수거 완료 사진 촬영
  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  //  수거 완료 처리 (사진 업로드 + 문 닫기)
  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('오류', '사진을 먼저 촬영해주세요.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('usertoken');

      //  웹에 수거 완료 사진 업로드
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'collection.jpg',
      });

      await axiosWebInstance.patch(
        `/employee/collectionCompleted/${alarmId}`,
        formData,
        {
          headers: {
            access: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      //문 닫기 요청청
      await requestBoxClose(alarmId, boxId);

      // 완료 후 boxlist로 이동
      Alert.alert('완료', '수거 완료 및 문 닫기가 완료되었습니다.');
      router.replace('/page/boxlist');

    } catch (error) {
      console.error('수거 완료 실패:', error);
      Alert.alert('오류', '수거 완료 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>수거 완료 사진 전송</Text>

      {/* 사진 촬영 버튼 */}
      <TouchableOpacity style={styles.acceptButton} onPress={handleTakePhoto}>
        <Text style={styles.acceptText}>사진 촬영</Text>
      </TouchableOpacity>

      {/* 촬영된 사진 미리보기 */}
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 300, height: 200, marginTop: 20 }}
        />
      )}

      {/* 수거 완료 전송 버튼 */}
      <TouchableOpacity
        style={[styles.acceptButton, { marginTop: 30 }]}
        onPress={handleSubmit}
      >
        <Text style={styles.acceptText}>수거 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CollectionCompleteScreen;
