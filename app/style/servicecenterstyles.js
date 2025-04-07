import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9F9F9",
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ECECEC",
      borderRadius: 10,
      paddingHorizontal: 15,
      height: 40,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
    },
    searchIcon: {
      marginLeft: 10,
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 15,
    },
    tagButton: {
      backgroundColor: "#ECECEC",
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      fontSize: 14,
      color: "#333",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
    },
    announcementItem: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    announcementText: {
      fontSize: 14,
      color: "#333",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    chatButton: {
      flex: 1,
      backgroundColor: "#ECECEC",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginRight: 10,
    },
    callButton: {
      flex: 1,
      backgroundColor: "#ECECEC",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      fontSize: 14,
      color: "#333",
      fontWeight: "bold",
    },
    businessInfo: {
      marginTop: 30,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: "#DDD",
    },
    businessText: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
    },
    businessDetails: {
      fontSize: 12,
      color: "gray",
    },
  });

export default styles;