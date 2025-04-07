import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    
  // 🔹 모달 오버레이 (배경 어둡게)
  modalOverlay: { 
    flex: 1, 
    justifyContent: "flex-end", 
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  // 🔹 모달 컨테이너 (둥근 모서리 & 크기 조정)
  modalContainer: { 
    backgroundColor: "#fff", 
    padding: 16, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    alignItems: "center",
    width: "100%",
  },

  // 🔹 드래그 바 (위쪽 슬라이더 표시)
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    marginBottom: 10,
  },

  // 🔹 모달 내부 박스 (아이템 정보 컨테이너)
  modalCard: { 
    width: "95%", // ✅ 가로 크기 조정
    backgroundColor: "#fff", 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: "#ddd",
  },

  // 🔹 상품명 (왼쪽 상단)
  modalTitle: { 
    fontSize: 16, 
    fontWeight: "bold",
    marginBottom: 8, // ✅ 아래 요소와 간격 조정
  },

  // 🔹 수량 조절 및 가격 컨테이너 (가로 정렬)
  quantityPriceContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between",  // ✅ 수량은 왼쪽, 가격은 오른쪽
    alignItems: "center", 
  },

  // 🔹 수량 조절 컨테이너 (왼쪽)
  quantityContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    top:26,
  },

  // 🔹 수량 조절 버튼 디자인
  quantityButton: { 
    padding: 6, 
    borderWidth: 1, 
    borderRadius: 50, 
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    
  },
  quantityText: { fontSize: 16, fontWeight: "bold" },

  // 🔹 가격 & 포인트 컨테이너 (오른쪽 끝)
  priceContainer: { 
    flexDirection: "row", 
    left:190,
    
  },

  // 🔹 할인 가격 (작게 & 흐리게 표시)
  oldPrice: { 
    textDecorationLine: "line-through", 
    color: "#999", 
    fontSize: 14,
    marginRight: 6,
    right:7,
  },

  // 🔹 포인트 (크기 강조)
  newPrice: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "black",
    bottom:3,
    right:3,
  },

  // 🔹 장바구니 담기 버튼
  addToCartButton: { 
    backgroundColor: "#0A9A5A", 
    paddingVertical: 14, 
    width: "95%", // ✅ 가로 길이 유지
    alignItems: "center", 
    borderRadius: 10,
    marginTop: 12,
  },
  addToCartText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
})

export default style;