import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50, // 하단 중앙 배치
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  characterImage: {
    width: width * 0.8,
    height: height * 0.8,
  },
});
