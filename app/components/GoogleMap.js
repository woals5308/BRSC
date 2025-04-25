import React, { useRef, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Modal,
  Pressable, KeyboardAvoidingView, Platform, Alert
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useFetchLocationAndData from "../hook/userFetchLocationAndData";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import styles from "../style/mapstyles";
import { useSearchBox } from "../hook/useSearchBox"; //  커스텀 훅 import

const Map = () => {
  const router = useRouter();
  const { currentLocation, collectionPoints } = useFetchLocationAndData();

  const mapRef = useRef(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [searchText, setSearchText] = useState('');

  const { handleSearch, isSearching } = useSearchBox(mapRef); //  훅 사용

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" style="light" />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} />

        {/* 검색창 */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="수거함 이름 또는 ID 검색"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch(searchText)}
          />
        </View>

        <Pressable style={styles.mapContainer} onPress={closeModal}>
          {currentLocation && (
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={currentLocation}
              showsUserLocation
            >
              {/* 내 위치 */}
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="내 위치"
                opacity={0}
                onPress={handleUserLocationPress}
              />

              {/* 수거함 마커들 */}
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

        {/* 하단 바텀시트 */}
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

        {/* 상세 모달 */}
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
    </KeyboardAvoidingView>
  );
};

export default Map;
