import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";
export const fetchMyInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("usertoken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/page/LoginPage");
      return null;
    }

    const response = await axiosInstance.get("/myInfo", {
      headers: {
        access: `Bearer ${token}`,
      },
    });

    console.log('[응답 인터셉터] 응답 성공: /myInfo');
    console.log(response.data);
    
    return response.data; 
  } catch (error) {
    console.error("내 정보 가져오기 실패:", error);
    return null;
  }
};
