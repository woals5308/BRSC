import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// 내 주변 수거함 가져오기
export const getNearbyCollectionPoints = async (latitude, longitude) => {
  try {
    const token = await AsyncStorage.getItem("usertoken");

    if (!token) {
      console.warn("❗ 토큰 없음 - 로그인 필요");
      Alert.alert("로그인이 필요합니다.");
      return [];
    }

    console.log("📦 저장된 토큰:", token);

    const url = `/findAllBox`;
    console.log("📡 API 요청 주소:", url);

    // ✅ 헤더를 넘기지 않고 axiosInstance가 알아서 붙이게!
    const response = await axiosInstance.get(url);

    console.log("✅ 수거함 응답 데이터:", response.data);

    // ✅ location 파싱: WKT → 위경도
    return response.data
      .map((item) => {
        const match = item.location.match(/POINT \(([^ ]+) ([^ ]+)\)/);
        if (match) {
          return {
            ...item,
            latitude: parseFloat(match[2]),
            longitude: parseFloat(match[1]),
          };
        } else {
          console.warn("⚠️ WKT 파싱 실패:", item.location);
        }
        return null;
      })
      .filter(Boolean); // null 제거
  } catch (error) {
    console.error("📛 수거함 데이터 가져오기 실패:", error);

    if (error.response) {
      console.error("❌ 응답 상태:", error.response.status);
      console.error("❌ 응답 데이터:", error.response.data);
    }

    Alert.alert("데이터 로딩 실패", "서버로부터 데이터를 가져오는 데 실패했습니다.");
    return [];
  }
};
