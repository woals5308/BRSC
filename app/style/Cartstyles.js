import { StyleSheet } from "react-native";




const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16, backgroundColor: "#fff", marginTop: 40 },
  backButton: { position: "absolute", left: 16 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "bold" },
  selectionContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, paddingHorizontal: 16, backgroundColor: "#fff" },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  selectText: { fontSize: 14, marginLeft: 8 },
  deleteText: { fontSize: 14, color: "red" },
  itemContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 16 },
  itemImage: { width: 70, height: 70, marginHorizontal: 10, borderRadius: 5 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, marginBottom: 8 },
  quantityRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  quantityControls: { flexDirection: "row", alignItems: "center" },
  circleButton: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#ddd", justifyContent: "center", alignItems: "center", marginHorizontal: 5 },
  priceContainer: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  originalPrice: { textDecorationLine: "line-through", color: "#aaa", marginRight: 5 },
  discountedPrice: { fontWeight: "bold", color: "black" },
  deleteIcon: { position: "absolute", top: 5, right: 10 },
  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  footerContainer: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  paymentContainer: {
    paddingVertical: 10,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#333",
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  orderButton: {
    backgroundColor: "green",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },


    });

export default styles