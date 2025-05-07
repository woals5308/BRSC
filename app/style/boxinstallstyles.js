import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    inner: {
      flex: 1,
      justifyContent: 'center', //  중앙 정렬
      alignItems: 'center', // 수평 중앙
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#2196F3',
      borderRadius: 10,
      alignItems: 'center',
      width: 200, // 버튼 크기 고정
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    imagePreview: {
      width: 200,
      height: 200,
      marginTop: 10,
      borderRadius: 10,
    },
  });

export default styles;