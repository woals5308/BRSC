import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    height: 56,
    top: 40,
  },
  backButton: {
    width: 32,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 220,
    height: 220,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  placeholderText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "black",
  },
  inactiveDot: {
    backgroundColor: "#D3D3D3",
  },
  finalButton: {
    backgroundColor: "#0A9A5A", // 초록색 버튼
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 30, // 기존 요소들과의 간격 추가
  },
  finalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});


export default styles;