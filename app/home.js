import { Text, Image } from "react-native";
import styles from "./style/homestyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchTimer from "./hook/useFetchtimer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useFetchTimer();

  // useEffect(() => {
  //   // 앱 시작할 때 토큰 삭제
  //   const clearTokens = async () => {
  //     try {
  //       await AsyncStorage.removeItem('usertoken');
  //       await AsyncStorage.removeItem('refreshtoken');
  //       console.log("🧹 토큰 초기화 완료");
  //     } catch (error) {
  //       console.error("❌ 토큰 삭제 실패:", error);
  //     }
  //   };

  //   clearTokens();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Image style={styles.logo} source={require('./assets/image/mainlogo.png')} />
      <Text style={styles.subtitle}>화재걱정 없는 배터리 배출의 시작</Text>
    </SafeAreaView>
  );
};

export default Home;
