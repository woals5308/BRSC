import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getMyBoxLogs } from "../api/myBoxLogApi";
import BottomNavigation from "../components/BottomNavigation";

const IMAGE_BASE_URL = "http://localhost:8081/collectionImage";

const nameMap = {
  battery: "배터리",
  discharged: "방전된 배터리",
  undischarged: "방전되지 않은 배터리",
};

const BoxLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [startYear, setStartYear] = useState(2024);
  const [startMonth, setStartMonth] = useState(1);
  const [endYear, setEndYear] = useState(2025);
  const [endMonth, setEndMonth] = useState(12);

  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getMyBoxLogs();
        setLogs(data);
        setFilteredLogs(data);
      } catch (e) {
        console.error("❌ 로그 불러오기 실패:", e);
        Alert.alert("에러", "수거 로그를 불러오지 못했습니다.");
      }
    };
    fetchLogs();
  }, []);

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

  const groupByYear = (items) => {
    return items.reduce((acc, item) => {
      const year = new Date(item.boxLog.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${month}월 ${day}일 · ${ampm} ${String(formattedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const grouped = groupByYear(filteredLogs);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>수거내역</Text>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterVisible(true)}
      >
        <Text style={styles.filterText}>수거내역 필터 ⌄</Text>
      </TouchableOpacity>

      <ScrollView>
        {Object.keys(grouped)
          .sort((a, b) => b - a)
          .map((year) => (
            <View key={year}>
              <Text style={styles.yearTitle}>{year}</Text>
              {grouped[year].map((item, index) => {
                const logId = item.boxLog?.logId;
                const date = item.boxLog?.date;
                const totalCount = item.items?.reduce((sum, i) => sum + i.count, 0) ?? 0;
                const readableItems = item.items
                  .map((i) => `${nameMap[i.name] ?? i.name} ${i.count}개`)
                  .join(", ");

                return (
                  <TouchableOpacity key={logId ?? index} style={styles.card}>
                    <Image
                      style={styles.image}
                      source={{ uri: `${IMAGE_BASE_URL}/${logId}` }}
                    />
                    <View style={styles.cardText}>
                      <Text style={styles.cardType}>수거 총 합계 : {totalCount}개</Text>
                      <Text style={styles.cardSub}>{readableItems}</Text>
                      <Text style={styles.cardDate}>{formatDateTime(date)}</Text>
                    </View>
                   
                  </TouchableOpacity>
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
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>수거내역 필터</Text>
                <Text style={styles.modalLabel}>기간</Text>
                <View style={styles.dateRow}>
                  <View style={styles.datePickerColumn}>
                    <Picker
                      selectedValue={startYear}
                      onValueChange={(val) => setStartYear(val)}
                    >
                      {years.map((year) => (
                        <Picker.Item key={year} label={`${year} 년`} value={year} />
                      ))}
                    </Picker>
                    <Picker
                      selectedValue={startMonth}
                      onValueChange={(val) => setStartMonth(val)}
                    >
                      {months.map((month) => (
                        <Picker.Item key={month} label={`${month} 월`} value={month} />
                      ))}
                    </Picker>
                  </View>
                  <Text style={styles.toText}> ~ </Text>
                  <View style={styles.datePickerColumn}>
                    <Picker
                      selectedValue={endYear}
                      onValueChange={(val) => setEndYear(val)}
                    >
                      {years.map((year) => (
                        <Picker.Item key={year} label={`${year} 년`} value={year} />
                      ))}
                    </Picker>
                    <Picker
                      selectedValue={endMonth}
                      onValueChange={(val) => setEndMonth(val)}
                    >
                      {months.map((month) => (
                        <Picker.Item key={month} label={`${month} 월`} value={month} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                      setStartYear(2024);
                      setStartMonth(1);
                      setEndYear(2025);
                      setEndMonth(12);
                    }}
                  >
                    <Text style={{ color: "#999" }}>초기화</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                    <Text style={{ color: "white" }}>적용하기</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", paddingTop: 60 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  filterButton: { margin: 16 },
  filterText: { fontSize: 14, fontWeight: "500" },
  yearTitle: { fontSize: 16, fontWeight: "600", margin: 16 },
  card: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  cardText: { flex: 1 },
  cardType: { fontSize: 15, fontWeight: "500", color: "#333" },
  cardSub: { fontSize: 13, color: "#666", marginTop: 2 },
  cardDate: { fontSize: 13, color: "#999", marginTop: 4 },
  arrow: { fontSize: 20, color: "#AAA" },
  emptyText: { marginTop: 40, textAlign: "center", color: "#999" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalLabel: { fontSize: 14, color: "#555", marginBottom: 8 },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  toText: { marginHorizontal: 10, fontSize: 16 },
  datePickerColumn: { flex: 1 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  resetButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default BoxLogPage;
