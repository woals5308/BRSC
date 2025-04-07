import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import useFetchLocationAndData from "../hook/userFetchLocationAndData";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import styles from "../style/mapstyles";

const Map = () => {
  const router = useRouter();
  const { currentLocation, collectionPoints } = useFetchLocationAndData();

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);

  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    setModalVisible(true);
    setBottomSheetVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setBottomSheetVisible(false);
  };

  const handleUserLocationPress = () => {
    setBottomSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style="light" />

      {/* ← 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} />

      <Pressable style={styles.mapContainer} onPress={closeModal}>
        {currentLocation && (
          <MapView
            style={styles.map}
            region={currentLocation} // ✅ 내 위치 중심
            showsUserLocation
          >
            {/* 🔹 내 위치 마커 */}
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="내 위치"
              opacity={0}
              onPress={handleUserLocationPress}
            />

            {/* 🔹 수거함 마커들 */}
            {collectionPoints.map((point, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                title={point.name}
                onPress={() => handleMarkerPress(point)}
              />
            ))}
          </MapView>
        )}
      </Pressable>

      {/* ✅ 하단 바텀시트 */}
      {bottomSheetVisible && (
        <View style={styles.bottomSheet}>
          <View style={styles.dragIndicator} />
          <TouchableOpacity onPress={() => router.push("/page/usedetail")}>
            <View style={styles.infoBox}>
              <Text style={styles.modalTitle}>수거함 이용방법</Text>
              <Text style={styles.modalInfo}>배터리가 알려주는 안전한 배터리 이용수칙!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qrButton} onPress={() => router.push("/page/QR")}>
            <Text style={styles.qrButtonText}>📷 QR 스캔하기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ 상세 모달 (배경 클릭 시 닫힘) */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <Pressable style={styles.modalContainer}>
            {selectedPoint ? (
              <>
                <View style={styles.infoBox}>
                  <Text style={styles.modalTitle}>{selectedPoint.name}</Text>
                  <Text style={styles.modalInfo}>
                    수거량 {selectedPoint.capacity ?? 0}% · 배터리 {selectedPoint.batteryCount ?? 0}개 수거 가능
                  </Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxText}>QR코드 인식에 문제가 있나요?</Text>
                  <TouchableOpacity style={styles.supportButton}>
                    <Text style={styles.supportButtonText}>고객센터</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.qrButton} onPress={() => router.push("/page/QR")}>
                  <Text style={styles.qrButtonText}>📷 QR 스캔하기</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.errorText}>수거함 정보를 가져올 수 없습니다.</Text>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Map;
