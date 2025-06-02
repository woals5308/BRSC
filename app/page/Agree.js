import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import styles from "../style/argreestyles";

const TermsPage = () => {
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

<ScrollView style={styles.termsContainer}>
  <Text style={styles.termsText}>
    ● <Text style={{ fontWeight: "bold" }}>서비스 목적</Text>{"\n"}
    본 앱은 배터리 수거자를 위한 전용 서비스입니다.{"\n\n"}

    ● <Text style={{ fontWeight: "bold" }}>수거자의 역할</Text>{"\n"}
    수거자는 앱을 통해 수거 요청을 확인하고, QR코드로 박스를 개폐하여 수거 및 설치 작업을 수행합니다.{"\n\n"}

    ● <Text style={{ fontWeight: "bold" }}>안전 준수</Text>{"\n"}
    모든 작업은 지정된 절차에 따라 안전하게 수행되어야 합니다.{"\n\n"}

    ● <Text style={{ fontWeight: "bold" }}>정보 수집</Text>{"\n"}
    수거자의 위치, 작업 기록 등의 데이터는 서비스 제공을 위해 수집됩니다.{"\n\n"}

    ● <Text style={{ fontWeight: "bold" }}>개인정보 보호</Text>{"\n"}
    개인정보는 관련 법령에 따라 안전하게 보호되며, 서비스 외 목적으로는 사용되지 않습니다.{"\n\n"}

    ● <Text style={{ fontWeight: "bold" }}>이용 조건</Text>{"\n"}
    본 약관에 동의하지 않으면 서비스를 이용할 수 없습니다.
  </Text>
</ScrollView>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#4BB179" : undefined}
        />
        <Text style={styles.checkboxLabel}>위 약관에 동의합니다.</Text>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !isChecked && styles.disabledButton]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermsPage;
