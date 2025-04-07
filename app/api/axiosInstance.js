import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// ✅ Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://192.168.0.51:8080/",
  timeout: 5000,
});

// ✅ 요청 인터셉터: access 토큰을 요청에 자동 추가 (헤더 이름: access)
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("usertoken");
    console.log("📤 [요청 인터셉터] 저장된 access 토큰:", token);

    if (token) {
      config.headers.access = `Bearer ${token}`; // ✅ 백엔드가 기대하는 헤더 이름!
      console.log("✅ [요청 인터셉터] access 헤더 설정 완료:", config.headers.access);
    } else {
      console.warn("⚠️ [요청 인터셉터] access 토큰 없음 - access 헤더 설정 안 됨");
    }

    return config;
  },
  (error) => {
    console.error("❌ [요청 인터셉터] 에러:", error);
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터: access 토큰 만료 시 refresh로 재발급 시도
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ [응답 인터셉터] 응답 성공:", response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.warn("⚠️ [응답 인터셉터] 에러 발생:", error?.response?.status, originalRequest?.url);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshtoken");
        console.log("🔄 [재발급 시도] 저장된 refresh token:", refreshToken);

        if (!refreshToken) throw new Error("refresh token 없음");

        // ✅ 재발급 요청
        const res = await axios.post("http://192.168.0.51:8080/reissue", null, {
          headers: {
            refresh: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = res.headers["access"];
        console.log("✅ [재발급 성공] 새 access token:", newAccessToken);

        if (newAccessToken) {
          // ❗ Bearer 제거하지 않음 (백엔드에서 그대로 기대함)
          await AsyncStorage.setItem("usertoken", newAccessToken);
          console.log("💾 [저장 완료] access 토큰 갱신 저장됨");

          originalRequest.headers.access = newAccessToken;
          console.log("🔁 [요청 재시도] 새 access 토큰으로 원래 요청 재시도:", originalRequest.url);

          return axiosInstance(originalRequest);
        } else {
          throw new Error("재발급된 access token 없음");
        }
      } catch (refreshError) {
        console.error("❌ [재발급 실패] 오류:", refreshError);
        await AsyncStorage.removeItem("usertoken");
        await AsyncStorage.removeItem("refreshtoken");
        Alert.alert("세션이 만료되었습니다", "다시 로그인 해주세요.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
