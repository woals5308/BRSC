import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F6",
    paddingHorizontal: 20,
    paddingBottom: 80, // 네비게이션 바 공간 확보
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 15,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    right:15
  },
  profileCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationIcon: {
    width: 30,
    height: 30,
    marginRight: 8, // 오른쪽 여백
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 16,
    color: "gray",
  },
  highlightText: {
    color: "green",
    fontWeight: "bold",
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginVertical: 8,
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "green",
    borderRadius: 5,
  },
  points: {
    textAlign: "right",
    fontSize: 14,
    color: "gold",
  },

  /** ✅ 지도 스타일 */
  mapContainer: {
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  mapTitleContainer: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  mapImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 15,
    
    
  },
  badgeContainer: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: 'red',
  borderRadius: 10,
  width: 18,
  height: 18,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99,
},
badgeText: {
  color: 'white',
  fontSize: 10,
  fontWeight: 'bold',
},

  helpSection: {
    marginBottom: 15,
  },
  helpBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helpBox: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    left: 3,
    top:10,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },

  customerService: {
    backgroundColor: "#00A060",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    top:15,
  },
  customerServiceText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  customerServiceSubText: {
    color: "white",
    fontSize: 14,
  },

  /** ✅ 네비게이션 바 스타일 */
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
  },

  /** ✅ QR 코드 스캔 버튼 (정중앙 배치) */
  scanButton: {
    position: "absolute",
    bottom: 25, // 네비게이션 바보다 살짝 위로 띄움
    left: "50%", // 화면의 정중앙으로 이동
    transform: [{ translateX: -35 }], // 버튼 크기의 절반만큼 왼쪽으로 이동하여 중앙 정렬
    backgroundColor: "green",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // 그림자 효과 추가
  },
});

export default styles;
