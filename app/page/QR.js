import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Platform, TouchableOpacity, Switch } from "react-native";
import { CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { QR } from "../api/cameraApi";
import { AntDesign } from "@expo/vector-icons";
import styles from "../style/QRstyles";

const QRScanner =()=> {
  const router = useRouter();
  const [flashlight, setFlashlight] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Android에서는 StatusBar 표시 */}
      {Platform.OS === "android" ? (
        <StatusBar backgroundColor="#444" barStyle="light-content" />
      ) : null}

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back('/page/Main')}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      {/* 안내 문구 */}
      <Text style={styles.instructions}>
        수거함에 부착된 QR코드를{"\n"}사각형 테두리에 맞춰 인식해주세요
      </Text>

      {/* QR 카메라 */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camStyle}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: "qr" }}
          onBarcodeScanned={({ data }) => QR(data)}
        />
        <View style={styles.viewfinder} />
      </View>

      {/* 하단 버튼 */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>번호 직접입력</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => setFlashlight(!flashlight)}>
          <Text style={styles.buttonText}>손전등 켜기</Text>
        </TouchableOpacity>
      </View>

      {/* QR 코드 인식 문제 체크박스 */}
      <View style={styles.checkboxContainer}>
        <Switch value={false} />
        <Text style={styles.checkboxText}>QR코드 인식에 문제가 있나요?</Text>
      </View>

      {/* 고객센터 안내 */}
      <TouchableOpacity style={styles.customerService}>
        <Text style={styles.customerServiceText}>
          불편사항이 있다면{"\n"}고객센터를 이용해주세요.
        </Text>
        <Text style={styles.customerServiceSubText}>
          24시간 상담원이 대기 중이에요.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default QRScanner;
