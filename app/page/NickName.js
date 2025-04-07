import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../style/nickname";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      
      {/* 인사 메시지 */}
      <Text style={styles.title}>반가워요!</Text>
      <Text style={styles.subtitle}>제가 당신을 어떻게 부르면 좋을까요?</Text>

      {/* 닉네임 입력 필드 */}
      <TextInput
        style={styles.nicknameInput}
        placeholder="닉네임 입력"
        placeholderTextColor="#bbb"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 다음 버튼 (닉네임 입력 시 활성화) */}
      <TouchableOpacity
        style={[styles.nextButton, !nickname && styles.disabledButton]}
        onPress={() => router.push({
          pathname:"/page/NickNameNext",
          params:{nickname},
        })} // 데이터 전달 없이 이동
        disabled={!nickname} 
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nickname;
