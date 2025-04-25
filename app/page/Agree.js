import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import styles from "../style/argreestyles";


const TermsPage =()=> {

  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    if (!isChecked) {
      Alert.alert("약관 동의", "약관에 동의해야 다음 단계로 진행할 수 있습니다.");
      return;
    }
    router.push("/page/LoginPage");
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>이용 약관 동의</Text>

      {/* 약관 내용 */}
      <ScrollView style={styles.termsContainer}>
        <Text style={styles.termsText}>
          1. 본 서비스는 폐전지 수거를 위한 서비스입니다.{"\n"}
          2. 사용자는 본 서비스를 올바르게 이용해야 합니다.{"\n"}
          3. 개인정보 보호 정책을 준수해야 합니다.{"\n"}
          4. 기타 이용 약관 내용이 여기에 추가됩니다.{"\n"}
          5. 기{"\n"}
          6. 디{"\n"}
          7. 라{"\n"}
          8. 마{"\n"}
          9. 디{"\n"}
        </Text>
      </ScrollView>

      {/* 약관 동의 체크박스 */}
      <View style={styles.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? "#4BB179" : undefined} />
        <Text style={styles.checkboxLabel}>위 약관에 동의합니다.</Text>
      </View>

      {/* 다음 버튼 */}
      <TouchableOpacity style={[styles.nextButton, !isChecked && styles.disabledButton]} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TermsPage;