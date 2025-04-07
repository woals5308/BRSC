import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#00A862", // 초록색
    textTransform: "lowercase", // 소문자 유지
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    marginTop: 8,
  },
});

export default styles;