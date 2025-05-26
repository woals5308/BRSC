import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { signup, sendVerificationCode, verifyCode } from "../api/signupApi";
import styles from "../style/singstyles";
import { useRouter } from "expo-router";

// 지역 및 도시 데이터
const regionData = {
  "광역시/도": [],
  서울특별시: ["강남구", "서초구", "송파구", "강동구", "마포구", "용산구", "종로구", "중구", "성동구", "광진구"],
  부산광역시: ["해운대구", "수영구", "남구", "동구", "서구", "북구", "사상구", "사하구", "연제구", "영도구"],
  인천광역시: ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
  대구광역시: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
  광주광역시: ["동구", "서구", "남구", "북구", "광산구"],
  대전광역시: ["동구", "중구", "서구", "유성구", "대덕구"],
  울산광역시: ["중구", "남구", "동구", "북구", "울주군"],
  세종특별자치시: ["세종시"],
  경기도: ["수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시", "화성시", "평택시"],
  강원도: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군"],
  충청북도: ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군"],
  충청남도: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군"],
  전라북도: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군"],
  전라남도: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군"],
  경상북도: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시"],
  경상남도: ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군"],
  제주특별자치도: ["제주시", "서귀포시"],
};

const Signup = () => {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userphoneNumber, setUserphoneNumber] = useState("");
  const [Verif, setVerif ] = useState("");
  const [isCodesent, setIsCodesent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");

  const [openRegion, setOpenRegion] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  const [regionItems, setRegionItems] = useState(
    Object.keys(regionData).map((region) => ({ label: region, value: region }))
  );
  const [cityItems, setCityItems] = useState([]);

  useEffect(() => {
    if (location1) {
      const cities = regionData[location1].map((city) => ({
        label: city,
        value: city,
      }));
      setCityItems(cities);
    } else {
      setCityItems([]);
      setLocation2("");
    }
  }, [location1]);

  const handleSendCode = async () => {
    if (!userphoneNumber) return Alert.alert("전화번호를 입력해주세요");

    try {
      const result = await sendVerificationCode(userphoneNumber);
      setIsCodesent(result === "Success");
      Alert.alert(result === "Success" ? "인증번호 전송 성공" : "인증 실패");
    } catch (e) {
      console.error("sendVerificationCode 에러:", e);
    }
  };

  const handleVerifyCode = async () => {
    if (!Verif) return Alert.alert("인증번호를 입력하세요");

    try {
      const result = await verifyCode(userphoneNumber, Verif);
      console.log(userphoneNumber, Verif);
      setIsVerified(result === "Success");
      Alert.alert(result === "Success" ? "인증 성공" : "인증 실패");
    } catch (e) {
      console.error("verifyCode 에러:", e);
    }
  };

const handleSignup = async () => {
  if (!userId || !userPw || !userName || !userphoneNumber || !location1 || !location2 || !Verif) {
    return Alert.alert("모든 정보를 입력해주세요");
  }

  if (!isVerified) {
    return Alert.alert("전화번호 인증을 먼저 완료해주세요.");
  }

  try {
    const result = await signup(
      userId,
      userPw,
      userName,
      userphoneNumber,
      Verif,
      location1,
      location2
    );
    console.log(userphoneNumber,Verif);

    Alert.alert(result ? "회원가입 성공!" : "이미 등록된 정보입니다.");
    if (result) router.push("/page/LoginPage");
  } catch (e) {
    console.error("회원가입 에러:", e);
    Alert.alert("회원가입 중 문제가 발생했습니다.");
  }
};
  return (
    <View style={{ flex: 1, backgroundColor: "#222" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>회원가입</Text>

          <View style={{ zIndex: openRegion ? 1000 : 1, width: "100%" }}>
            <DropDownPicker
              open={openRegion}
              value={location1}
              items={regionItems}
              setOpen={setOpenRegion}
              setValue={setLocation1}
              setItems={setRegionItems}
              placeholder="지역 선택 (광역시/도)"
              listMode="SCROLLVIEW"
              style={{ backgroundColor: "#333", borderColor: "#444", marginBottom: 10 }}
              dropDownContainerStyle={{ backgroundColor: "#333", borderColor: "#444" }}
              textStyle={{ color: "#fff" }}
              placeholderStyle={{ color: "#bbb" }}
            />
          </View>

          <View style={{ zIndex: openCity ? 900 : 0, width: "100%" }}>
            <DropDownPicker
              open={openCity}
              value={location2}
              items={cityItems}
              setOpen={setOpenCity}
              setValue={setLocation2}
              setItems={setCityItems}
              placeholder="도시 선택 (시/군/구)"
              disabled={!location1}
              listMode="SCROLLVIEW"
              style={{ backgroundColor: "#333", borderColor: "#444", marginBottom: 10 }}
              dropDownContainerStyle={{ backgroundColor: "#333", borderColor: "#444" }}
              textStyle={{ color: "#fff" }}
              placeholderStyle={{ color: "#bbb" }}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="아이디 :"
            value={userId}
            onChangeText={setUserId}
            placeholderTextColor="#bbb"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 :"
            value={userPw}
            onChangeText={setUserPw}
            secureTextEntry
            placeholderTextColor="#bbb"
          />
          <TextInput
            style={styles.input}
            placeholder="이름 :"
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="#bbb"
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호 :"
            value={userphoneNumber}
            onChangeText={setUserphoneNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#bbb"
          />

          <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode}>
            <Text style={styles.signupText}>인증번호 전송</Text>
          </TouchableOpacity>

          {isCodesent && (
            <>
              <TextInput
                style={styles.input}
                placeholder="인증번호 입력"
                value={Verif}
                onChangeText={(text) => setVerif(text.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                placeholderTextColor="#bbb"
              />
              <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
                <Text style={styles.signupText}>인증 확인</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupText}>회원가입</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;
