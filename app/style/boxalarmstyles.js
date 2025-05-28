import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";



const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // 하단 버튼 여유 공간 확보
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  listContainer: {
    maxHeight: height * 0.4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSubTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  message: {
    fontSize: 15,
    color: '#777',
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  acceptText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default styles;
