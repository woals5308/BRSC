import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const BoxRemoveScreen = () => {
  const params = useLocalSearchParams(); // id, name, IPAddress 등 전달됨
  const router = useRouter();

  const { id, name, IPAddress } = params;

  const handleRemoveComplete = async () => {
    try {
      await axios.patch(`http://192.168.0.51:8080/employee/removeCompleted/${id}`);

      Alert.alert('제거 완료!', '수거함 제거가 완료되었습니다.');
      router.back();

    } catch (error) {
      console.error('제거 완료 오류:', error);
      Alert.alert('오류', '제거 완료 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗑 수거함 제거</Text>
      <Text>이름: {name}</Text>
      <Text>IP 주소: {IPAddress}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="제거 완료" onPress={handleRemoveComplete} color="#F44336" />
      </View>
    </View>
  );
};

export default BoxRemoveScreen;

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
