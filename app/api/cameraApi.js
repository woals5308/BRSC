// api/cameraApi.js
import axiosInstance from "../api/axiosInstance";         // 앱 → IOT 통신
import axiosWebInstance from "../api/axiosweb";   // 웹 → 사진/알람 업데이트
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";
//수거함 문 열기기
export const handleQRScan = async (data, router) => {
  try {
    const { alarmId, boxId } = JSON.parse(data);
    const token = await AsyncStorage.getItem("usertoken");

    const response = await axiosInstance.get(`/employee/boxOpen/${alarmId}/${boxId}`, {
      headers: { access: `Bearer ${token}` },
    });

    if (response.data?.status === "SUCCESS") {
      router.push({
        pathname: "/page/CollectionProgress",
        params: { alarmId, boxId },
      });
    } else {
      Alert.alert("문 열기 실패", response.data?.message || "문 열기 실패");
    }
  } catch (error) {
    console.error("QR 인식 오류:", error);
    Alert.alert("오류", "QR 처리 중 오류 발생");
  }
};
// 3. 문 닫기 (IOT)
export const requestBoxClose = async (alarmId, boxId) => {
  const token = await AsyncStorage.getItem("usertoken");

  return axiosInstance.get(`/employee/boxClose/${alarmId}/${boxId}/`, {
    headers: {
      access: `Bearer ${token}`,
    },
  });
};

// 4. 수거 최종 완료 상태 업데이트 (웹)
export const completeCollectionStatus = async (alarmId) => {
  const token = await AsyncStorage.getItem("usertoken");

  return axiosWebInstance.patch(`/employee/collectioneEnd/${alarmId}`, null, {
    headers: {
      access: `Bearer ${token}`,
    },
  });
};
