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

import { getMyBoxLogs } from "../api/myBoxLogApi";
import { FireLog } from "../api/firelogApi";
import BottomNavigation from "../components/BottomNavigation";
import styles from "../style/boxlogstyles";
import axiosInstance from "../api/axiosInstance";
import { Buffer } from "buffer";
import AlarmIcon from "../components/AlarmIcon";
import NotificationTab from "./alarm";
import useBackHandler from "../hook/usebackHandler";

const nameMap = {
  battery: "건전지",
  discharged: "방전된 배터리",
  notDischarged: "방전되지 않은 배터리",
};

const BoxLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [fireLogs, setFireLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filteredFireLogs, setFilteredFireLogs] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [startYear, setStartYear] = useState(2024);
  const [startMonth, setStartMonth] = useState(1);
  const [endYear, setEndYear] = useState(2025);
  const [endMonth, setEndMonth] = useState(12);
  const [collectionImages, setCollectionImages] = useState({});
  const [fireImages, setFireImages] = useState({});
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);

  useBackHandler(() => true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getMyBoxLogs();
        const fireData = await FireLog();
        setLogs(data);
        setFilteredLogs(data);
        setFireLogs(fireData);
        setFilteredFireLogs(fireData);
      } catch (e) {
        Alert.alert("에러", "로그를 불러오지 못했습니다.");
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imageResults = await Promise.all(filteredLogs.map(async (item) => {
        const id = item.boxLog?.logId;
        if (!id) return { id, base64: null };
        try {
          const res = await axiosInstance.get(`/collectionImage/${id}`, { responseType: "arraybuffer" });
          const base64 = `data:image/jpeg;base64,${Buffer.from(res.data, "binary").toString("base64")}`;
          return { id, base64 };
        } catch {
          return { id, base64: null };
        }
      }));

      const fireImageResults = await Promise.all(filteredFireLogs.map(async (item) => {
        try {
          const res = await axiosInstance.get(`/fireImage/${item.id}`, { responseType: "arraybuffer" });
          const base64 = `data:image/jpeg;base64,${Buffer.from(res.data, "binary").toString("base64")}`;
          return { id: item.id, base64 };
        } catch {
          return { id: item.id, base64: null };
        }
      }));

      const imageMap = {};
      imageResults.forEach(({ id, base64 }) => { imageMap[id] = base64; });
      const fireMap = {};
      fireImageResults.forEach(({ id, base64 }) => { fireMap[id] = base64; });

      setCollectionImages(imageMap);
      setFireImages(fireMap);
    };

    if (filteredLogs.length > 0 || filteredFireLogs.length > 0) {
      fetchImages();
    }
  }, [filteredLogs, filteredFireLogs]);

  const applyFilter = () => {
    const startDate = new Date(startYear, startMonth - 1, 1);
    const endDate = new Date(endYear, endMonth, 0);
    const filtered = logs.filter((item) => {
      const logDate = new Date(item.boxLog.date);
      return logDate >= startDate && logDate <= endDate;
    });
    const filteredFire = fireLogs.filter((item) => {
      const fireDate = new Date(item.date);
      return fireDate >= startDate && fireDate <= endDate;
    });
    setFilteredLogs(filtered);
    setFilteredFireLogs(filteredFire);
    setFilterVisible(false);
  };

  const resetFilter = () => {
    setStartYear(2024);
    setStartMonth(1);
    setEndYear(2025);
    setEndMonth(12);
    setFilteredLogs(logs);
    setFilteredFireLogs(fireLogs);
    setFilterVisible(false);
  };

  const formatDateTime = (ts) => {
    if (!ts) return "날짜 없음";
    const d = new Date(ts);
    const m = d.getMonth() + 1;
    const h = d.getHours();
    const t = h < 12 ? "오전" : "오후";
    return `${m}월 ${d.getDate()}일 · ${t} ${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>수거내역</Text>
        <View style={styles.notificationWrapper}>
          <AlarmIcon onPress={() => setNotificationTabVisible(true)} />
        </View>
      </View>

      <NotificationTab visible={isNotificationTabVisible} onClose={() => setNotificationTabVisible(false)} />

      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
        <Text style={styles.filterText}>수거내역 필터 ⌄</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {filteredLogs.map((item, idx) => {
          const img = collectionImages[item.boxLog?.logId];
          const total = item.items?.reduce((s, i) => s + i.count, 0);
          const detail = item.items?.map((i) => `${nameMap[i.name] ?? i.name} ${i.count}개`).join(", ");
          return (
            <View key={idx} style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
              {img ? (
                <Image source={{ uri: img }} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 6 }} />
              ) : (
                <View style={{ width: 80, height: 80, backgroundColor: '#ccc', marginRight: 10, borderRadius: 6 }} />
              )}
              <View style={styles.cardText}>
                <Text style={styles.cardType}>수거 총 합계 : {total}개</Text>
                <Text style={styles.cardReward}>보상: {item.boxLog?.value ?? 0}P</Text>
                <Text style={styles.cardSub}>{detail}</Text>
                <Text style={styles.cardDate}>{formatDateTime(item.boxLog?.date)}</Text>
              </View>
            </View>
          );
        })}

        {filteredFireLogs.map((item, idx) => {
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

        {filteredLogs.length === 0 && filteredFireLogs.length === 0 && (
          <Text style={styles.emptyText}>표시할 로그가 없습니다.</Text>
        )}
      </ScrollView>

<Modal visible={filterVisible} transparent animationType="slide">
  <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
    <View style={styles.modalContainer} />
  </TouchableWithoutFeedback>
  <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>수거내역 필터</Text>
    <Text style={styles.modalLabel}>기간</Text>

    <View style={styles.dateRow}>
      {/* 시작 년도, 월 */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 6 }}>
          {["2023", "2024", "2025"].map((year) => (
            <TouchableOpacity key={year} onPress={() => setStartYear(parseInt(year))}>
              <Text style={[styles.optionText, startYear === parseInt(year) && styles.selectedText]}>
                {year} 년
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {[...Array(12)].map((_, i) => (
            <TouchableOpacity key={i + 1} onPress={() => setStartMonth(i + 1)}>
              <Text style={[styles.optionText, startMonth === i + 1 && styles.selectedText]}>
                {i + 1} 월
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.toText}> ~ </Text>

      {/* 종료 년도, 월 */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 6 }}>
          {["2023", "2024", "2025"].map((year) => (
            <TouchableOpacity key={year} onPress={() => setEndYear(parseInt(year))}>
              <Text style={[styles.optionText, endYear === parseInt(year) && styles.selectedText]}>
                {year} 년
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {[...Array(12)].map((_, i) => (
            <TouchableOpacity key={i + 1} onPress={() => setEndMonth(i + 1)}>
              <Text style={[styles.optionText, endMonth === i + 1 && styles.selectedText]}>
                {i + 1} 월
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>

    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
        <Text>초기화</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
        <Text style={{ color: "#fff" }}>적용하기</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      <BottomNavigation />
    </View>
  );
};

export default BoxLogPage;