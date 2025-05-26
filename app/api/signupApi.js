import axiosInstance from "./axiosInstance";

//  회원가입 API - verificationCode 추가됨
export const signup = async (
  userId,
  userPw,
  userName,
  userphoneNumber,
  Verif, //  추가
  location1,
  location2
) => {
  try {
    const requestData = {
      id: userId,
      pw: userPw,
      name: userName,
      phoneNumber: userphoneNumber,
      verificationCode : Verif, //  여기도 포함
      location1,
      location2,
    };

    const response = await axiosInstance.post("/joinRequest", requestData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("회원가입 응답:", response.data);

    if (response.data === "Fail") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);

    if (error.response) {
      console.error("응답 데이터:", error.response.data);
      alert(
        `회원가입 실패: ${error.response.data.message || "서버 오류가 발생했습니다."}`
      );
    } else {
      alert("네트워크 오류: 인터넷 연결을 확인하세요.");
    }

    return false;
  }
};

//  인증 번호 전송
export const sendVerificationCode = async (phoneNumber) => {
  try {
    const res = await axiosInstance.post(`/send-one/${phoneNumber}`);
    console.log("인증 번호 전송:", res.data);
    return res.data;
  } catch (error) {
    console.error("인증번호 전송 실패:", error);
    return false;
  }
};

//  인증 번호 확인
export const verifyCode = async (phone, code) => {
  try {
    const res = await axiosInstance.post("/verify-code", null, {
      params: { phone, code },
    });
    console.log("인증 확인 응답:", res.data);
    return res.data;
  } catch (error) {
    console.error("인증 확인 실패:", error);
    return false;
  }
};
