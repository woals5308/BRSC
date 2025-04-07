import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // 🔹 상단 네비게이션 바 스타일
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  iconButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  // 🔹 아이템 리스트 스타일
  itemWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 12, 
    backgroundColor: "#fff", 
    marginBottom: 15, 
    justifyContent: "space-between" 
  },

  // 🔹 상품 이미지 & 하트 아이콘 포함하는 래퍼
  imageWrapper: { position: "relative", alignItems: "center", justifyContent: "center" }, 
  itemImage: { width: 110, height: 110, borderRadius: 10, backgroundColor: "#ddd" },

  // ✅ 하트 아이콘 (이미지 우측 상단 배치)
  favoriteIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 4,
    borderRadius: 15,
  },

  itemInfo: { flex: 1, marginLeft: 10 },

  // 🔹 아이템 제목 & 설명
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  itemDescription: { fontSize: 13, color: "#666", marginVertical: 4 },

  // 🔹 가격 & 포인트 스타일
  itemFooter: { flexDirection: "column", alignItems: "flex-start", marginTop: 6 },
  itemPrice: { fontSize: 14, color: "#999", textDecorationLine: "line-through" },
  itemPoints: { fontSize: 16, fontWeight: "bold", color: "black" },

  // 🔹 장바구니 아이콘 위치 조정
  cartIcon: {
    top: 42,
  },
  cartButton: {
    position: "relative",
    padding: 8,
  },
  
  badge: {
    position: "absolute",
    top: 2,
    right: 0,
    backgroundColor: "#0A9A5A",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

});

export default styles;
