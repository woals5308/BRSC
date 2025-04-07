import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signup } from "../api/signupApi";
import styles from "../style/singstyles";
import { useRouter } from "expo-router";

const Signup = () => {

  const router = useRouter();
  // 입력값 상태 관리
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userphoneNunber, setUserphoneNumber] = useState("");

  // 회원가입 처리 함수
  const handleSingup = async () => {
    if (!userId || !userPw || !userName || !userphoneNunber) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    try {
      const result = await signup(userId, userPw, userName, userphoneNunber);
      
      if (result) {
        alert("회원가입에 성공하였습니다!");
        router.push("/page/LoginPage"); 
      } else {
        alert("이미 등록된 정보입니다.\n아이디 또는 전화번호가 중복됩니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류:", error);
      alert("회원가입 처리 중 문제가 발생했습니다.");
    }
  };


  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디 :"
        placeholderTextColor="#bbb"
        value={userId}
        onChangeText={setUserId}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호 :"
        placeholderTextColor="#bbb"
        secureTextEntry={true}
        value={userPw}
        onChangeText={setUserPw}
      />

      {/* 닉네임 입력 */}
      <TextInput
        style={styles.input}
        placeholder="닉네임 :"
        placeholderTextColor="#bbb"
        value={userName}
        onChangeText={setUserName}
      />

      {/* 폰 번호*/}
      <TextInput
        style={styles.input}
        placeholder="핸드폰 번호 :"
        placeholderTextColor="#bbb"
        value={userphoneNunber}
        onChangeText={setUserphoneNumber}
      />


      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSingup}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
