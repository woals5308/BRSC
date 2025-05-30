import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../style/nicknamenext";
import { useRouter } from "expo-router";
import { icons } from "../assets/icon/icons";
import { fetchMyInfo } from "../api/myinfoApi"; // API 가져오기

const NickNameNext = () => {
  const router = useRouter();
  const [name, setName] = useState(""); // 사용자 이름 상태

  useEffect(() => {
    const getMyInfo = async () => {
      const data = await fetchMyInfo();
      if (data && data.name) {
        setName(data.name); // 이름 저장
      }
    };

    getMyInfo();

    const timer = setTimeout(() => {
      router.push("/page/Main");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" style="light" />

      <View style={styles.contentWrapper}>
        {/* 텍스트 묶음 - 이미지 위에 보이도록 */}
        <View style={{ position: "absolute", top: "15%", alignItems: "center" }}>
          <Text style={styles.title}>좋아요 {name}님!</Text>
          <Text style={styles.subtitle}>
            화재 걱정 없는 배터리 배출을{"\n"}시작하러 함께 떠나볼까요?
          </Text>
        </View>

        {/* 캐릭터 이미지 */}
        <Image
          source={icons.nickname}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default NickNameNext;
