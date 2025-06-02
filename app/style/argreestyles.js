import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "white",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      top:20,
    },
    termsContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 20,
      marginBottom: 30,
      backgroundColor: "#F9F9F9",
    },
    termsText: {
      fontSize: 14,
      color: "#333",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      left:70,
    },
    checkboxLabel: {
      fontSize: 16,
      marginLeft: 10,
    
    },
    nextButton: {
      backgroundColor: "#4BB179",
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    disabledButton: {
      backgroundColor: "#aaa",
    },
    buttonText: {
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
    },
    termsText: {
  fontSize: 14,
  color: "#333",
  lineHeight: 22,  // 선택사항
},
  });

  export default styles;