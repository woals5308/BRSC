import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { getNearbyCollectionPoints } from "../api/aroundboxApi"; //  API 불러오기

const useFetchLocationAndData = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [collectionPoints, setCollectionPoints] = useState([]);
  console.log("1");
  useEffect(() => {
    const fetchLocationAndData = async () => {
      try {
        console.log("2");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("위치 권한이 필요합니다.");
          return;
        }
        console.log("3");
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

        //  API를 호출하여 수거함 데이터 가져오기
        const points = await getNearbyCollectionPoints(latitude, longitude);
        setCollectionPoints(points);
      } catch (error) {
        console.error("위치 정보 가져오기 실패:", error);
        Alert.alert("위치 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchLocationAndData();
  }, []);

  return { currentLocation, collectionPoints };
};

export default useFetchLocationAndData;
