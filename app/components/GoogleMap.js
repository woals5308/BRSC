import React, { useRef, useState, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Modal,
  Pressable, KeyboardAvoidingView, Platform, Image
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useFetchLocationAndData from "../hook/userFetchLocationAndData";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { icons } from "../assets/icon/icons";
import styles from "../style/mapstyles";
import { useSearchBox } from "../hook/useSearchBox";
import useSecuredImage from "../hook/useBoxImage";

const getBoxIcon = (box) => {
  const isFire =
    box.fireStatus1 === 'FIRE' ||
    box.fireStatus2 === 'FIRE' ||
    box.fireStatus3 === 'FIRE';

  const volumes = [box.volume1, box.volume2, box.volume3];
  const hasFull = volumes.some(v => v >= 81);
  const hasWarning = volumes.some(v => v >= 51);

  if (box.usageStatus === 'BLOCKED') {
    return isFire ? icons.boxFire : null;
  }

  if (box.usageStatus === 'USED') return null;

  if (box.usageStatus === 'AVAILABLE') {
    if (isFire) return icons.boxFire;
    if (hasFull) return icons.boxFull;
    if (hasWarning) return icons.boxMiddle;
    return icons.box;
  }

  return null;
};

const getPercentage = (usedVolume, maxVolume = 100) =>
  Math.round((usedVolume / maxVolume) * 100);

const binNames = ['건전지', '방전된 배터리', '방전되지 않은 배터리'];

const Map = () => {
  const router = useRouter();
  const { currentLocation, collectionPoints, fetchCollectionData } = useFetchLocationAndData();
  const mapRef = useRef(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [searchText, setSearchText] = useState('');
  const imageUri = useSecuredImage(`/boxImage/${selectedPoint?.id}`);
  const { handleSearch } = useSearchBox(mapRef);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        fetchCollectionData();
      }, 3000);

      return () => {
        clearInterval(interval);
        setSelectedPoint(null);
        setModalVisible(false);
        setBottomSheetVisible(false);
      };
    }, [fetchCollectionData])
  );

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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" style="light" />
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/page/Main')} />

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
              <Marker
                coordinate={currentLocation}
                title="내 위치"
                opacity={0}
                onPress={handleUserLocationPress}
              />
              {collectionPoints.filter(getBoxIcon).map((point) => (
                <Marker
                  key={`${point.id}-${point.fireStatus1}-${point.volume1}-${point.volume2}-${point.volume3}`}
                  coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                  title={point.name}
                  onPress={() => handleMarkerPress(point)}
                  image={getBoxIcon(point)}
                />
              ))}
            </MapView>
          )}
        </Pressable>

        {bottomSheetVisible && (
          <View style={styles.bottomSheet}>
            <View style={styles.dragIndicator} />
            <TouchableOpacity onPress={() => router.push("/page/usedetail")}>
              <View style={styles.infoBox}>
                <Text style={styles.modalTitle}>수거함 이용방법</Text>
                <Text style={styles.modalInfo}>배터리가 알려주는 안전한 배터리 이용수칙!</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <Pressable style={styles.modalBackground} onPress={closeModal}>
            <Pressable style={styles.modalContainer}>
              {selectedPoint ? (
                <>
                  <View style={styles.infoBox}>
                    <Text style={styles.modalTitle}>{selectedPoint.name}</Text>

                    {selectedPoint.usageStatus === 'BLOCKED' &&
                    !['FIRE'].includes(selectedPoint.fireStatus1) &&
                    !['FIRE'].includes(selectedPoint.fireStatus2) &&
                    !['FIRE'].includes(selectedPoint.fireStatus3) ? (
                      <Text style={[styles.modalInfo, { color: 'red', fontWeight: 'bold', marginTop: 10 }]}>
                        ⚠️ 사용 금지 상태입니다
                      </Text>
                    ) : (
                      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.modalInfo}>(수거함 사용률 요약)</Text>
                          {[0, 1, 2].map((i) => {
                            const volume = selectedPoint[`volume${i + 1}`];
                            const percent = getPercentage(volume);
                            return (
                              <Text
                                key={i}
                                style={[styles.modalInfo, percent >= 80 && { color: 'red', fontWeight: 'bold' }]}
                              >
                                {binNames[i]}: {percent}%
                              </Text>
                            );
                          })}
                        </View>

                        <View style={{ width: 110, height: 130, marginLeft: 10 }}>
                          {imageUri ? (
                            <Image
                              source={{ uri: imageUri }}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#ccc'
                              }}
                              resizeMode="cover"
                            />
                          ) : (
                            <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'center' }}>
                              이미지를 불러오는 중...
                            </Text>
                          )}
                        </View>
                      </View>
                    )}
                  </View>

                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>QR코드 인식에 문제가 있나요?</Text>
                    <TouchableOpacity style={styles.supportButton}>
                      <Text style={styles.supportButtonText}>고객센터</Text>
                    </TouchableOpacity>
                  </View>
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
