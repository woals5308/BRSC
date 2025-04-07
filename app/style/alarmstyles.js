import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 배경
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tab: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: 250,
    height: '90%',
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationContent: {
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

export default styles;