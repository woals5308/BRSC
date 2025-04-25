import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
  
    mapContainer: { flex: 1 },
  
    map: { width: "100%", height: "100%" },
  
    bottomSheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: -2 },
      elevation: 5,
    },
  
    dragIndicator: {
      width: 40,
      height: 5,
      backgroundColor: "#CCC",
      borderRadius: 3,
      alignSelf: "center",
      marginBottom: 10,
    },
  
    infoBox: {
      backgroundColor: "#F9F9F9",
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
  
    modalTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
  
    modalInfo: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
  
    qrButton: {
      backgroundColor: "#0A9A5A",
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
  
    qrButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  
    modalBackground: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  
    modalContainer: {
      backgroundColor: "#fff",
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: -2 },
    },
  
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#F9F9F9",
      padding: 14,
      borderRadius: 10,
      marginTop: 10,
    },
  
    checkboxText: {
      fontSize: 14,
      color: "#666",
    },
  
    supportButton: {
      backgroundColor: "#0A9A5A",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
  
    supportButtonText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
    backButton: {
      position: "absolute",
      top: 50, // 상단 여백 (StatusBar 높이 고려)
      left: 10, // 왼쪽 여백
      zIndex: 10, // 지도 위에 표시되도록 함
      right:20,
      padding: 10,
      borderRadius: 20,
    },
    searchBar: {
      position: 'absolute',
      top: 60,
      left: 20,
      right: 20,
      backgroundColor: 'white',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 100,
    },
    
    searchInput: {
      fontSize: 16,
      color: '#333',
    },
  });
  

export default styles;