import axiosInstance from "./axiosInstance";


// 회원가입 API
export const signup = async (userId, userPw, userName, userphoneNumber) => {
  try {
    const requestData = {
      id: userId,
      pw: userPw,
      name: userName,
      phoneNumber: userphoneNumber,
    };

    const response = await axiosInstance.post("/joinRequest", requestData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("회원가입 응답:", response.data);

    //  백엔드에서 "Fail"이면 false 반환
    if (response.data === "Fail") {
      return false;
    }

    //  백엔드에서 "Success"면 true 반환
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

    return false; // 에러 발생 시 false 반환
  }
};


//인증 번호 전송
export const sendVerificationCode = async (phoneNumber) =>{
  try{
    const res = await axiosInstance.post(`/send-one/${phoneNumber}`)
    console.log("인증 번호 전송띠", res.data);
    return res.data;
  }catch(error){
    console.error("실패띠",error);
    return false;
  }
};


//인증 번호 확인
export const verifyCode = async(phoneNumber, code) =>{
  try{
    const res = await axiosInstance.post("/verify-code", null,{
      params:{phoneNumber,code},
    });
    console.log("앙 인증띠", res.data);
    return res.data
  }catch(error){
    console.error("앙 에러띠",error);

    return false;
  }
} 