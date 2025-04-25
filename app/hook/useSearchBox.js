// hooks/useSearchBox.js
import { useState } from "react";
import { Alert } from "react-native";
import { FindBoxById, FindBoxByName } from "../api/findbox.APi";

export const parseLocationFromWKT = (locationString) => {
  if (!locationString || !locationString.startsWith("POINT")) return null;
  const match = locationString.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
  if (match) {
    return {
      longitude: parseFloat(match[1]),
      latitude: parseFloat(match[2]),
    };
  }
  return null;
};

export const useSearchBox = (mapRef) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchText) => {
    if (isSearching || !searchText?.trim()) return;
    setIsSearching(true);

    try {
      let box = !isNaN(searchText)
        ? await FindBoxById(searchText)
        : await FindBoxByName(searchText);

      const parsedCoords = parseLocationFromWKT(box?.location);

      if (parsedCoords) {
        mapRef.current?.animateToRegion({
          latitude: parsedCoords.latitude,
          longitude: parsedCoords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } else {
        Alert.alert("검색 결과 없음", "수거함 위치 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("검색 실패:", error);
      Alert.alert("검색 실패", error.message || "에러 발생");
    } finally {
      setIsSearching(false);
    }
  };

  return { handleSearch, isSearching };
};
