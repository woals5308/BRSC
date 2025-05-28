import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getMyBoxLogs } from "../api/myBoxLogApi";
import { FireLog } from "../api/firelogApi";
import BottomNavigation from "../components/BottomNavigation";
import styles from "../style/boxlogstyles";
import axiosInstance from "../api/axiosInstance";
import { Buffer } from "buffer";

const nameMap = {
  battery: "건전지",
  discharged: "방전된 배터리",
  undischarged: "방전되지 않은 배터리",
};

const BoxLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [fireLogs, setFireLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [startYear, setStartYear] = useState(2024);
  const [startMonth, setStartMonth] = useState(1);
  const [endYear, setEndYear] = useState(2025);
  const [endMonth, setEndMonth] = useState(12);
  const [collectionImages, setCollectionImages] = useState({});
  const [fireImages, setFireImages] = useState({});

  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getMyBoxLogs();
        const fireData = await FireLog();
        console.log("✅ 수거 데이터:", data);
        console.log("🔥 화재 데이터:", fireData);
        setLogs(data);
        setFilteredLogs(data);
        setFireLogs(fireData.filter(item => item.date));
      } catch (e) {
        console.error("❌ 로그 불러오기 실패:", e);
        Alert.alert("에러", "로그를 불러오지 못했습니다.");
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = filteredLogs.map(async (item) => {
        const boxLogId = item.boxLog?.logId; // ← ✅ logId 로 접근해야 함
        if (!boxLogId) {
          console.log("❗ boxLog.logId 없음:", item);
          return { id: undefined, base64: null };
        }
        try {
          const res = await axiosInstance.get(`/collectionImage/${boxLogId}`, { responseType: "arraybuffer" });
          const base64 = `data:image/jpeg;base64,${Buffer.from(res.data, "binary").toString("base64")}`;
          return { id: boxLogId, base64 };
        } catch (err) {
          console.log(`❌ 수거 이미지 실패: /collectionImage/${boxLogId}`);
          return { id: boxLogId, base64: null };
        }
      });

      const fireImagePromises = fireLogs.map(async (item) => {
        try {
          const res = await axiosInstance.get(`/fireImage/${item.id}`, { responseType: "arraybuffer" });
          const base64 = `data:image/jpeg;base64,${Buffer.from(res.data, "binary").toString("base64")}`;
          return { id: item.id, base64 };
        } catch (err) {
          console.log(`❌ 화재 이미지 실패: /fireImage/${item.id}`);
          return { id: item.id, base64: null };
        }
      });

      const imageResults = await Promise.all(imagePromises);
      const fireImageResults = await Promise.all(fireImagePromises);

      const imageMap = {};
      imageResults.forEach(({ id, base64 }) => { imageMap[id] = base64; });
      const fireImageMap = {};
      fireImageResults.forEach(({ id, base64 }) => { fireImageMap[id] = base64; });

      setCollectionImages(imageMap);
      setFireImages(fireImageMap);
    };

    if (filteredLogs.length > 0 || fireLogs.length > 0) {
      fetchImages();
    }
  }, [filteredLogs, fireLogs]);

  const applyFilter = () => {
    const startDate = new Date(startYear, startMonth - 1, 1);
    const endDate = new Date(endYear, endMonth, 0);
    const filtered = logs.filter((item) => {
      const logDate = new Date(item.boxLog.date);
      return logDate >= startDate && logDate <= endDate;
    });
    setFilteredLogs(filtered);
    setFilterVisible(false);
  };

  const groupByYear = (items, dateKeyPath) => {
    return items.reduce((acc, item) => {
      const dateVal = dateKeyPath.split('.').reduce((obj, key) => obj?.[key], item);
      if (!dateVal) return acc;
      const year = new Date(dateVal).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "날짜 없음";
    const date = new Date(timestamp);
    if (isNaN(date)) return "날짜 오류";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${month}월 ${day}일 · ${ampm} ${String(formattedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const groupedLogs = groupByYear(filteredLogs, 'boxLog.date');
  const groupedFires = groupByYear(fireLogs, 'date');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>수거내역</Text>

      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
        <Text style={styles.filterText}>수거내역 필터 ⌄</Text>
      </TouchableOpacity>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {Object.keys(groupedLogs).sort((a, b) => b - a).map((year) => (
            <View key={year}>
              <Text style={styles.yearTitle}>{year}</Text>
              {groupedLogs[year].map((item, idx) => {
                const date = item.boxLog?.date;
                const total = item.items?.reduce((sum, i) => sum + i.count, 0) ?? 0;
                const readable = item.items
                  ?.map((i) => `${nameMap[i.name] ?? i.name} ${i.count}개`)
                  .join(", ");
                const imageUri = collectionImages[item.boxLog?.logId];

                return (
                  <View key={idx} style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                    {imageUri ? (
                      <Image source={{ uri: imageUri }} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 6 }} />
                    ) : (
                      <View style={{ width: 80, height: 80, backgroundColor: '#ccc', marginRight: 10, borderRadius: 6 }} />
                    )}
                    <View style={styles.cardText}>
                      <Text style={styles.cardType}>수거 총 합계 : {total}개</Text>
                      <Text style={styles.cardReward}>보상: {item.boxLog?.value ?? 0}원</Text>
                      <Text style={styles.cardSub}>{readable}</Text>
                      <Text style={styles.cardDate}>{formatDateTime(date)}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}

          {Object.keys(groupedFires).sort((a, b) => b - a).map((year) => (
            <View key={year}>
              <Text style={styles.yearTitle}>{year} (화재처리)</Text>
              {groupedFires[year].map((item, idx) => {
                const imageUri = fireImages[item.id];
                return (
                  <View key={idx} style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                    {imageUri ? (
                      <Image source={{ uri: imageUri }} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 6 }} />
                    ) : (
                      <View style={{ width: 80, height: 80, backgroundColor: '#ccc', marginRight: 10, borderRadius: 6 }} />
                    )}
                    <View style={styles.cardText}>
                      <Text style={styles.cardType}>박스 ID: {item.boxId}</Text>
                      <Text style={styles.cardDate}>{formatDateTime(item.date)}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}

          {filteredLogs.length === 0 && (
            <Text style={styles.emptyText}>표시할 로그가 없습니다.</Text>
          )}
        </ScrollView>

      <Modal visible={filterVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>수거내역 필터</Text>
                <Text style={styles.modalLabel}>기간</Text>
                <View style={styles.dateRow}>
                  <View style={styles.datePickerColumn}>
                    <Picker selectedValue={startYear} onValueChange={setStartYear}>
                      {years.map((y) => (
                        <Picker.Item key={y} label={`${y} 년`} value={y} />
                      ))}
                    </Picker>
                    <Picker selectedValue={startMonth} onValueChange={setStartMonth}>
                      {months.map((m) => (
                        <Picker.Item key={m} label={`${m} 월`} value={m} />
                      ))}
                    </Picker>
                  </View>
                  <Text style={styles.toText}> ~ </Text>
                  <View style={styles.datePickerColumn}>
                    <Picker selectedValue={endYear} onValueChange={setEndYear}>
                      {years.map((y) => (
                        <Picker.Item key={y} label={`${y} 년`} value={y} />
                      ))}
                    </Picker>
                    <Picker selectedValue={endMonth} onValueChange={setEndMonth}>
                      {months.map((m) => (
                        <Picker.Item key={m} label={`${m} 월`} value={m} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.resetButton} onPress={() => {
                    setStartYear(2024);
                    setStartMonth(1);
                    setEndYear(2025);
                    setEndMonth(12);
                  }}>
                    <Text style={{ color: "#999" }}>초기화</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                    <Text style={{ color: "#fff" }}>적용하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <BottomNavigation />
    </View>
  );
};

export default BoxLogPage;