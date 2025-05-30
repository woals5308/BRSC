import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", paddingTop: 60 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  filterButton: { margin: 16 },
  filterText: { fontSize: 14, fontWeight: "500" },
  yearTitle: { fontSize: 16, fontWeight: "600", margin: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: { flex: 1 },
  cardType: { fontSize: 15, fontWeight: "500", color: "#333" },
  cardSub: { fontSize: 13, color: "#666", marginTop: 2 },
  cardDate: { fontSize: 13, color: "#999", marginTop: 4 },
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
header: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 16,
  position: 'relative',
  backgroundColor: "#F4F5F6",
},

title: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#333',
},

notificationWrapper: {
  position: 'absolute',
  right: 16,
  top: 16,
},






});

export default styles;