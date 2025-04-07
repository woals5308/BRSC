import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  nicknameInput: {
    width: "80%",
    backgroundColor: "#E8F5E9",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#00A060",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A5D6A7",
  },
});
