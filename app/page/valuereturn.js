import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ValuePoint = () => {
  const { point } = useLocalSearchParams(); // param으로 받은 포인트
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/page/Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>적립 완료</Text>
      <Text style={styles.pointText}>{point}원 적립되었습니다!</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>홈으로 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValuePoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pointText: {
    fontSize: 20,
    color: '#0A9A5A',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});