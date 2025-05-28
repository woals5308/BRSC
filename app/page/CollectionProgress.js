import React, { useEffect, useState } from 'react';
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
import axiosWebInstance from '../api/axiosweb';
import { requestBoxClose } from '../api/cameraApi';
import styles from '../style/QRstyles';
import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';

const CollectionCompleteScreen = () => {
  const { alarmId, boxId} = useLocalSearchParams();
  const [unresolvedAlarms] = useUnresolvedAlarms();
  const [alarm, setAlarm] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (unresolvedAlarms.length > 0) {
      const found = unresolvedAlarms.find(
        (a) => String(a.id)
      );
      setAlarm(found);
    }
  }, [unresolvedAlarms]);

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

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('오류', '사진을 먼저 촬영해주세요.');
      return;
    }

    if (!alarm || !alarm.id || !alarm.boxId) {
      Alert.alert('오류', '알람 정보를 불러오지 못했습니다.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('usertoken');

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

      // const closeResult = await requestBoxClose(alarm.boxId);
      
      // if (!closeResult?.success) {
      //   console.log("~!~!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      //   console.log(closeResult);
      //   Alert.alert(
      //     '주의',
      //     '수거 사진은 전송되었지만 수거함 문 닫기에는 실패했습니다.\n다시 시도하거나 관리자에게 문의해주세요.'
      //   );
      // } else {
      //   Alert.alert('완료', '수거 완료 및 문 닫기가 완료되었습니다.');
      // }

      router.push('/page/boxlist');
    } catch (error) {
      console.error('수거 완료 실패:', error);
      Alert.alert('오류', '수거 완료 처리 중 문제가 발생했습니다.');
    }
  };

  if (!alarm) {
    return (
      <View style={styles.container}>
        <Text>알람 정보를 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>수거 완료 사진 전송</Text>

      <TouchableOpacity style={styles.acceptButton} onPress={handleTakePhoto}>
        <Text style={styles.acceptText}>사진 촬영</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 300, height: 200, marginTop: 20 }}
        />
      )}

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
