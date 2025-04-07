import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  instructions: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  cameraContainer: {
    width: 250,
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  camStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  viewfinder: {
    position: "absolute",
    width: 200,
    height: 200,
    borderColor: "green",
    borderWidth: 4,
    borderRadius: 10,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  bottomButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: {
    color: "white",
    marginLeft: 10,
  },
  customerService: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
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
});


export default styles;