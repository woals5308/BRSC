import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: "#F4F5F6",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  notificationWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
  },

  content: {
    padding: 20,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 8,
    borderColor: '#f2f2f2',
    paddingBottom: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },

  profileText: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  email: {
    color: '#666',
    fontSize: 14,
  },

  edit: {
    color: '#888',
    fontSize: 14,
  },

  listItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  versionBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  versionText: {
    color: 'red',
    marginRight: 10,
    fontWeight: 'bold',
  },

  updateButton: {
    backgroundColor: '#008000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  updateText: {
    color: 'white',
    fontSize: 12,
  },
});
export default styles;