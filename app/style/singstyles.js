import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  sendCodeButton: {
    backgroundColor: "#888",
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  
  verifyButton: {
    backgroundColor: "#555",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  
});

export default styles