import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosWebInstance from '../api/axiosweb';
import { useUnresolvedAlarms } from '../hook/useUnresolveAlarm';

const CollectionCompleteScreen = () => {
  const { alarmId, boxId } = useLocalSearchParams();
  const [unresolvedAlarms] = useUnresolvedAlarms();
  const [alarm, setAlarm] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [point, setPoint] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (unresolvedAlarms.length > 0) {
      const found = unresolvedAlarms.find((a) => String(a.id) === String(alarmId));
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
      setLoading(true);
      const token = await AsyncStorage.getItem('usertoken');

      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'collection.jpg',
      });

      const res = await axiosWebInstance.patch(
        `/employee/collectionCompleted/${alarmId}`,
        formData,
        {
          headers: {
            access: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(" 수거 완료 응답:", res?.data ?? res);

      await AsyncStorage.setItem(`completed-${alarmId}`, 'true');
      const returnedPoint = res?.data;

      setPoint(returnedPoint); // 포인트 UI에 표시
      setTimeout(() => router.push('/page/boxlist'), 6000); // 6초 후 이동
    } catch (error) {
      console.error(
        '수거 완료 실패:',
        error?.response?.data || error.message || error
      );
      Alert.alert('오류', '수거 완료 처리 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!alarm) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>알람 정보를 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>수거 완료 사진 전송</Text>

      {point !== null ? (
        <>
          <Text style={styles.pointText}>{point}원 적립되었습니다!</Text>
          <ActivityIndicator size="large" color="#0A9A5A" style={{ marginTop: 20 }} />
          <Text style={{ marginTop: 10, color: '#555' }}>잠시 후 목록으로 이동합니다...</Text>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>사진 촬영하기</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image.uri }}
              style={styles.preview}
              resizeMode="cover"
            />
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 30 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>수거 완료</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />}
        </>
      )}
    </View>
  );
};

export default CollectionCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#008CBA',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  preview: {
    width: 300,
    height: 200,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loadingText: {
    color: 'black',
    fontSize: 16,
  },
  pointText: {
    fontSize: 20,
    color: "#0A9A5A",
    fontWeight: "bold",
    marginTop: 20,
  },
});
