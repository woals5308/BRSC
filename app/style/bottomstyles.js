import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    height: 70,
    paddingHorizontal: 20, // 좌우 여백 추가
  },
  navItemLeft: {
    alignItems: "center",
    flex: 1,
    marginRight: 30, // 왼쪽 아이콘 간격 조정
    right: 10,
  },
  navItemRight: {
    alignItems: "center",
    flex: 1,
    marginLeft: 30, // 오른쪽 아이콘 간격 조정
    left: 10,
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
    color: "gray",
  },
  scanButton: {
    position: "absolute",
    bottom: -10, // 네비게이션보다 살짝 위
    left: "50%",
    transform: [{ translateX: -37 }], // 버튼 크기의 절반만큼 왼쪽으로 이동하여 중앙 정렬
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "transparent", // ✅ 하얀색 배경 제거
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonImage: {
    width: 60,
    height: 60,
    resizeMode: "contain", 
  },
});

export default styles;
