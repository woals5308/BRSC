import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { API } from "../config/env";

//expo 실행 명령어 npx expo start --dev-client
//이거 팀원들이랑 연동할 떄 사용할 인스턴스
const axiosInstance = axios.create({
  baseURL: API.USER,
  timeout: 5000,
  
});




//  요청 인터셉터: access 토큰을 자동 추가 (회원가입/로그인 제외)
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("usertoken");
    const skipTokenUrls = ["/login", "/joinRequest"]; // 인증 불필요한 경로

    const isPublic = skipTokenUrls.some((url) => config.url?.includes(url));

    if (token && !isPublic) {
      config.headers.access = token; // 백엔드가 기대하는 헤더 이름
      console.log("[요청 인터셉터] access 헤더 설정 완료:", config.headers.access);
    } else {
      console.log("[요청 인터셉터] 인증 필요 없는 요청 또는 토큰 없음 - 헤더 생략");
    }

    return config;
  },
  (error) => {
    console.error("[요청 인터셉터] 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: access 토큰 만료 시 refresh로 재발급 시도
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(" [응답 인터셉터] 응답 성공:", response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const skipRefreshUrls = ["/login", "/joinRequest"];
    const isPublic = skipRefreshUrls.some((url) => originalRequest?.url?.includes(url));

    if (error.response?.status === 401 && !originalRequest._retry && !isPublic) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshtoken");
        console.log(" [재발급 시도] 저장된 refresh token:", refreshToken);

        if (!refreshToken) throw new Error("refresh token 없음");

        const res = await axios.post("http://10.20.39.50:8080/reissue", null, {
          headers: {
            refresh: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = res.headers["access"];
        console.log("[재발급 성공] 새 access token:", newAccessToken);

        if (newAccessToken) {
          await AsyncStorage.setItem("usertoken", newAccessToken);
          console.log(" [저장 완료] access 토큰 갱신 저장됨");

          originalRequest.headers.access = newAccessToken;
          console.log(" [요청 재시도] 새 access 토큰으로 원래 요청 재시도:", originalRequest.url);

          return axiosInstance(originalRequest);
        } else {
          throw new Error("재발급된 access token 없음");
        }
      } catch (refreshError) {
        console.error(" [재발급 실패] 오류:", refreshError);
        await AsyncStorage.removeItem("usertoken");
        await AsyncStorage.removeItem("refreshtoken");
        Alert.alert("세션이 만료되었습니다", "다시 로그인 해주세요.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
