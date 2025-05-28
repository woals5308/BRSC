import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { getNearbyCollectionPoints } from "../api/aroundboxApi"; // API 불러오기

const useFetchLocationAndData = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [collectionPoints, setCollectionPoints] = useState([]);

  // 🔁 수거함 정보만 새로 갱신하는 함수
  const fetchCollectionData = useCallback(async () => {
    try {
      if (!currentLocation) return;
      const { latitude, longitude } = currentLocation;
      const points = await getNearbyCollectionPoints(latitude, longitude);
      setCollectionPoints(points);
    } catch (error) {
      console.error("수거함 정보 갱신 실패:", error);
    }
  }, [currentLocation]);

  // 🔰 최초 위치 + 수거함 정보 가져오기
  useEffect(() => {
    const fetchLocationAndData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("위치 권한이 필요합니다.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };

        setCurrentLocation(region);

        const points = await getNearbyCollectionPoints(latitude, longitude);
        setCollectionPoints(points);
      } catch (error) {
        console.error("위치 정보 가져오기 실패:", error);
        Alert.alert("위치 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchLocationAndData();
  }, []);

  return { currentLocation, collectionPoints, fetchCollectionData };
};

export default useFetchLocationAndData;
