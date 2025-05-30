import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F6",
  },
header: {
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 16,
  position: "relative",
},

headerTitle: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
},

  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  listContainer: {
    maxHeight: height * 0.4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemSubTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  message: {
    fontSize: 15,
    color: "#777",
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  acceptText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
notificationWrapper: {
  position: "absolute",
  right: 16,
  top: 16,
},
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default styles;
