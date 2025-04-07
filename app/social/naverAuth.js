import { Platform } from "react-native";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";

// 네이버 API 정보 (Android용)
const androidKeys = {
  kConsumerKey: "rn4lLHPUJ90GiEDRSQYJ",  // 네이버 개발자 센터에서 받은 Client ID
  kConsumerSecret: "dINFVuBg4G", // 네이버 개발자 센터에서 받은 Client Secret
  kServiceAppName: "BRSU", // 네이버 개발자 센터에서 설정한 앱 이름
};

// 네이버 로그인 함수
export const naverSignIn = async () => {
  try {
    const loginResult = await NaverLogin.login(androidKeys);

    if (loginResult.isSuccess) {
      const profile = await getProfile(loginResult.accessToken);
      console.log("네이버 로그인 성공:", profile);
      return profile;
    } else {
      console.log("네이버 로그인 실패:", loginResult);
      return null;
    }
  } catch (error) {
    console.error("네이버 로그인 오류:", error);
    return null;
  }
};
