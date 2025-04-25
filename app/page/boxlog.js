import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { getMyBoxLogs } from "../api/myBoxLogApi"; //  API 요청 함수

const BoxLogPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getMyBoxLogs();
        console.log(" 가져온 로그:", data);
        setLogs(data);
      } catch (e) {
        console.error(" 로그 불러오기 실패:", e);
        Alert.alert("에러", "수거 로그를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <Text style={styles.type}>
        유형: {item.type === 0 ? "수거자" : "사용자"}
      </Text>
      <Text style={styles.value}>포인트: {item.value}P</Text>
    </View>
  );
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 나의 수거 로그</Text>
      <FlatList
        data={logs}
        keyExtractor={(item, index) =>
          item?.log_id?.toString() ?? index.toString()
        }
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>표시할 로그가 없습니다.</Text>}
      />
    </View>
  );
};

export default BoxLogPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    marginBottom: 4,
  },
  type: {
    fontSize: 15,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    color: "#999",
  },
});
