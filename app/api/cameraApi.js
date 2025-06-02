// cameraApi.js
import axiosInstance from "../api/axiosInstance";         // 앱 → IOT 통신
import axiosWebInstance from "../api/axiosweb";           // 웹 → 사진/알람 상태
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";



export const handleQRScanWithValidation = async (data,router, alarmId, unresolvedAlarms) => {
  try {
    console.log(" QR 스캔 결과 (raw):", data);

    let alarmId, boxId;

    try {
      // const parsed = JSON.parse(data); // JSON인지 확
      console.log(" 파싱된 QR 데이터:", parsed);

      alarmId = alarmId;
      boxId = parsed?.boxId;
    } catch (err) {
      // JSON이 아닌 경우 숫자 QR일 가능성
      if (!isNaN(data)) {
        boxId = data;

        const matchingAlarm = unresolvedAlarms.find(
          (a) => String(a.boxId) === String(boxId)
        );

        if (matchingAlarm) {
          alarmId = matchingAlarm.id;
          console.log(" 숫자형 QR, 알람 매칭 성공:", matchingAlarm);
        } else {
          Alert.alert("QR 오류", "내가 수거 예약한 수거함이 아닙니다.");
          return;
        }
      } else {
        console.error(" QR 파싱 실패:", err.message, "| 받은 데이터:", data);
        Alert.alert("QR 오류", "올바른 QR 코드가 아닙니다.");
        return;
      }
    }

    // 최종 유효성 체크
    if (!alarmId || !boxId) {
      console.warn(" alarmId 또는 boxId가 정의되지 않음:", { alarmId, boxId });
      Alert.alert("QR 오류", "QR 코드에서 필요한 정보가 누락되었습니다.");
      return;
    }

    console.log(" API 요청: /employee/boxOpen/", alarmId, boxId);

    const token = await AsyncStorage.getItem("usertoken");
    if (!token) {
      console.error(" 저장된 토큰 없음");
      Alert.alert("로그인 오류", "인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }
    console.log("여기 고1")
    const response = await axiosWebInstance.get(`/employee/boxOpen/${alarmId}/${boxId}`, {
      headers: { access: `Bearer ${token}` },
    });
    console.log("여기 고")
    if (response.data == "200") {
      console.log(" 박스 열기 성공:", response.data);
      router.push({
        pathname: "/page/CollectionProgress",
        params: { alarmId:alarmId , boxId:boxId },
      });
    } else {
      console.warn(" 박스 열기 실패:", response.data);
      Alert.alert("문 열기 실패",response.data == "string" ? response.data : "서버 응답 오류");
    }
  } catch (error) {
    console.log(error);
    console.error(" QR 인식 처리 중 오류:", error.message || error);
    Alert.alert("오류", "QR 처리 중 문제가 발생했습니다.");
  }
};




/**
 * 문 닫기 요청
 */
// export const requestBoxClose = async (boxId) => {
//   const token = await AsyncStorage.getItem("usertoken");
//   const CLOSE_ALL_DOORS = 0;

//   try {
//     const response = await axiosInstance.get(
//       `/employee/boxClose/${boxId}/${CLOSE_ALL_DOORS}`,
//       {
//         headers: { access: `Bearer ${token}` },
//       }
//     );
//     console.log(response);
//     return response.data;
      
//   } catch (error) {
//     console.error("문 닫기 실패:", error?.response?.data || error.message);
//     return {
//       success: false,
//       error: error?.response?.data || error.message,
//     };
//   }
// };