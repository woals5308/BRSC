import React, {  useState } from "react";
import { View, Text, TextInput, TouchableOpacity ,Alert} from "react-native";
import { signup } from "../api/signupApi";
import styles from "../style/singstyles";
import { useRouter } from "expo-router";
import { sendVerificationCode } from "../api/signupApi";
import { verifyCode } from "../api/signupApi";


const Signup = () => {

  const router = useRouter();
  // 입력값 상태 관리
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userphoneNunber, setUserphoneNumber] = useState("");
  //여기까지는 기존의 로그인 하던 상태 관리 영역이고 추가로 인증 부분은 밑에 작성할 것

  const [verificationCode,setVerificationCode] = useState("")
  const [isCodesent, setIsCodesent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  //인증 번호 발송
  const handleSendCode = async()=>{
    if(!userphoneNunber){
      Alert.alert("전화번호를 입력해주세요");
      return;
    }

    try{
      const result = await sendVerificationCode(userphoneNunber);
      if(result === "Success"){
        setIsCodesent(true);
        Alert.alert("인증성공");
      }else{
        Alert.alert("실패....");
      }
    }catch(error){
      console.error("에러띠",error)
      return false;
    }
  };


  //인증 번호 확인

  const handleVerifyCode = async()=>{
    if(!verificationCode){
      Alert.alert("인증번호를 입력하삼");
      return;
    }
    
    try{
      const result = await verifyCode(userphoneNunber,verificationCode);
      if(result === "Success"){
        setIsVerified(true)
        Alert.alert("인증 성공")
      }else{
        Alert.alert("인증 실패임 인증 번호가 틀리다 임마");
      }
    }catch(error){
      console.error("에러발생발생",error);

      return false;
    }
  };




  // 회원가입 처리 함수
  const handleSingup = async () => {
    if (!userId || !userPw || !userName || !userphoneNunber) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    if (!isVerified) {
      Alert.alert("전화번호 인증이 필요합니다.");
      return;
    }

    try {
      const result = await signup(userId, userPw, userName, userphoneNunber);
      
      if (result) {
        alert("회원가입에 성공하였습니다!");
        router.push("/page/LoginPage"); 
      } else {
        alert("이미 등록된 정보입니다.\n아이디 또는 전화번호가 중복됩니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류:", error);
      alert("회원가입 처리 중 문제가 발생했습니다.");
    }
  };


  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디 :"
        placeholderTextColor="#bbb"
        value={userId}
        onChangeText={setUserId}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호 :"
        placeholderTextColor="#bbb"
        secureTextEntry={true}
        value={userPw}
        onChangeText={setUserPw}
      />

      {/* 닉네임 입력 */}
      <TextInput
        style={styles.input}
        placeholder="닉네임 :"
        placeholderTextColor="#bbb"
        value={userName}
        onChangeText={setUserName}
      />

      {/* 전화번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="전화번호 :"
        value={userphoneNunber}
        onChangeText={setUserphoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#bbb"
      />

      {/* 인증번호 발송 버튼 */}
      <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode}>
        <Text style={styles.signupText}>인증번호 전송</Text>
      </TouchableOpacity>



      {/* 인증번호 입력칸 & 확인 버튼 (코드 발송 이후 보여줌) */}
      {isCodesent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="인증번호 입력"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
            <Text style={styles.signupText}>인증 확인</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSingup}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
