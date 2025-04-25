import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
      },
      sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      card: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 10,
        marginBottom: 15,
      },
      acceptedCard: {
        backgroundColor: '#e0f7e9',
      },
      message: {
        fontSize: 16,
        marginBottom: 10,
      },
      acceptButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignSelf: 'flex-start',
      },
      disabledButton: {
        backgroundColor: '#9E9E9E',
      },
      acceptText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default styles;
