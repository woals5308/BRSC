// api/boxLogApi.js
import axiosInstance from "./axiosInstance";

// 내 수거 로그 가져오기
export const getMyBoxLogs = async () => {
  try {
    const response = await axiosInstance.get("/myBoxLog");
    return response.data;
  } catch (error) {
    console.error(" 박스 수거 로그 조회 실패:", error);
    throw error;
  }
};
