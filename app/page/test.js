import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Switch,
} from "react-native";
import { CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { handleQRScanWithValidation } from "../api/cameraApi";
import styles from "../style/QRstyles";
import { useUnresolvedAlarms } from "../hook/useUnresolveAlarm";
import { useLocalSearchParams } from "expo-router";

const QRScanner = () => {
  const router = useRouter();
  const [flashlight, setFlashlight] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [unresolvedAlarms] = useUnresolvedAlarms();
    const {alarmId} = useLocalSearchParams();
    console.log(alarmId);
  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="#444" barStyle="light-content" />
      )}

      <Text style={styles.instructions}>
        수거함에 부착된 QR코드를{"\n"}사각형 테두리에 맞춰 인식해주세요
      </Text>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camStyle}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={(result) => {
              console.log("📸 QR 스캔 결과:", result);

              if (!scanned && typeof result?.data === "string") {
                setScanned(true);
                handleQRScanWithValidation(result.data, router, unresolvedAlarms);
              }
            }}
        />
        <View style={styles.viewfinder} />
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonText}>번호 직접입력</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => setFlashlight(!flashlight)}
        >
          <Text style={styles.buttonText}>
            {flashlight ? "손전등 끄기" : "손전등 켜기"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Switch value={false} />
        <Text style={styles.checkboxText}>
          QR코드 인식에 문제가 있나요?
        </Text>
      </View>

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
};

export default QRScanner;
