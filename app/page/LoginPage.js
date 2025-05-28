import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import styles from "../style/loginstyles";
import { appleSignIn } from "../social/appleAuth";
import { naverSignIn } from "../social/naverAuth";
import { login } from "../api/loginApi";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; //  추가
import { connectSSE } from "../hook/usePolyfill";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const router = useRouter();

  const handleNaverLogin = async () => {
    const userInfo = await naverSignIn();
    if (userInfo) {
      router.push("/page/Main");
    }
  };

  const handleAppleLogin = async () => {
    const credential = await appleSignIn();
    if (credential) {
      await SecureStore.setItemAsync("userToken", credential.identityToken);
      router.push("/page/Main");
    }
  };

  const handleLogin = async () => {
    try {
      const loginSuccess = await login(id, password);
      if (loginSuccess) {
        await connectSSE();
        router.push("/page/NickNameNext");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View style={styles.container}>
            <Text style={styles.title}>로그인</Text>

            <View style={styles.loginBox}>
              <Text style={styles.label}>아이디</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={id}
                  onChangeText={setId}
                  placeholder="아이디 입력"
                  placeholderTextColor="#fff"
                />
                <TouchableOpacity onPress={() => setId("")}>
                  <Text style={styles.clearText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>비밀번호</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="비밀번호 입력"
                  placeholderTextColor="#fff"
                  secureTextEntry
                />
                <TouchableOpacity onPress={() => setPassword("")}>
                  <Text style={styles.clearText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.checkBoxContainer}
                  onPress={() => setAutoLogin(!autoLogin)}
                >
                  <Checkbox
                    value={autoLogin}
                    onValueChange={setAutoLogin}
                    color="#0f0"
                  />
                  <Text style={styles.autoLoginText}>자동로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.optionText}>아이디/비밀번호 찾기</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>지금 로그인</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.button, styles.kakao]}>
                <Image
                  source={require("../assets/icon/kakao.png")}
                  style={styles.icon}
                />
                <Text style={styles.text}>카카오로 로그인하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.apple]}
                onPress={handleAppleLogin}
              >
                <Image
                  source={require("../assets/icon/apple.png")}
                  style={styles.icon}
                />
                <Text style={styles.text}>Apple로 로그인하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.naver]}
                onPress={handleNaverLogin}
              >
                <Image
                  source={require("../assets/icon/naver.png")}
                  style={styles.icon}
                />
                <Text style={styles.text}>네이버로 로그인하기</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signupButton}>
                <Text
                  style={styles.signupText}
                  onPress={() => router.push("/page/SignPage")}
                >
                  지금 바로 회원가입 →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
