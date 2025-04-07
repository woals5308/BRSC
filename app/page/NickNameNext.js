import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../style/nicknamenext";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import nickname from "../style/nickname";
const NickNameNext = () => {
  const router = useRouter();
  const {nickname} = useLocalSearchParams();
  
    useEffect(()=>{
      const timer = setTimeout(()=>{
        router.push("/page/Main");
      }, 1000);
  
      return ()=> clearTimeout(timer);
    },[]);

  
  return (
    <View style={styles.container}>
      {/* 인사 메시지 */}
      <Text style={styles.title}>좋아요 {nickname}님!</Text>
      <Text style={styles.subtitle}>
        화재 걱정 없는 배터리 배출을{"\n"} 시작하러 함께 떠나볼까요?
      </Text>

      {/* 캐릭터 마스코트 자리 */}
      <View style={styles.characterPlaceholder}>
        <Text style={styles.placeholderText}>
          캐릭터 마스코트를 이용한{"\n"}환영 삽화가 들어갈 자리입니다.
        </Text>
      </View>
    </View>
  );
};

export default NickNameNext;
