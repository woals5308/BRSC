import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 크기에 맞춰 자동 확장
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    left:70,
  },
  faqItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
  },
  faqAnswer: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  customerService: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 30, // 하단에 딱 맞게 위치 조정
    left: 20,
    right: 20,
  },
  customerServiceText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  customerServiceSubText: {
    color: "white",
    fontSize: 14,
  },
});
export default styles;