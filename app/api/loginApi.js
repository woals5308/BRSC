import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// 로그인 처리
export const login = async (id, password) => {
  console.log("1");
  try {
    const formBody = new URLSearchParams();
    formBody.append("username", id);
    formBody.append("password", password);
    console.log("2");

    const response = await axiosInstance.post("/login", formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("3");

    const access = response.headers["access"] || response.headers["authorization"];
    const refresh = response.headers["refresh"]; // ⬅️ 만약 같이 오면

    console.log("✅ 받은 access:", access);
    console.log("✅ 받은 refresh:", refresh);

    // ✅ accessToken에서 'Bearer ' 제거하고 저장
    const accessToken = access?.startsWith("Bearer ")
      ? access.replace("Bearer ", "")
      : access;

    if (accessToken) {
      await AsyncStorage.setItem("usertoken", accessToken);
      if (refresh) {
        await AsyncStorage.setItem("refreshtoken", refresh);
      }
      alert("로그인에 성공하셨습니다.");
      console.log("4");
      return true;
    } else {
      alert("로그인에 실패하였습니다.");
      return false;
    }
  } catch (error) {
    console.error("로그인 요청 실패:", error);

    if (error.response) {
      console.log("응답 데이터:", error.response.data);
      console.log("응답 상태코드:", error.response.status);
      console.log("응답 헤더:", error.response.headers);
    } else if (error.request) {
      console.log("요청 자체 실패:", error.request);
    } else {
      console.log("기타 에러:", error.message);
    }

    alert("로그인 요청 중 문제가 발생했습니다.");
    return false;
  }
};
