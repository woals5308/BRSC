import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 30,
    paddingBottom: 50, // ✅ 추가: 아래 흰색 여백/밀림 방지
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    left:146,
  },
  loginBox: {
    width: 340,
    padding: 25,
    backgroundColor: "#222222",
    borderRadius: 18,
    marginBottom: 30,
    bottom:10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7c7c7c",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#acacac",
    marginBottom: 22,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#fff",
    fontSize: 14,
    paddingVertical: 5,
  },
  clearText: {
    fontSize: 20,
    color: "#bbb",
    padding: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  autoLoginText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#fff",
  },
  optionText: {
    fontSize: 14,
    color: "#7c7c7c",
  },
  loginButton: {
    backgroundColor: "#00C853",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  socialContainer: {
    marginTop: 2,
    alignItems: "center",
    bottom:25,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 330,
    height: 52,
    borderRadius: 25,
    marginVertical: 3,
  },
  kakao: {
    backgroundColor: "#FEE500",
  },
  apple: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  naver: {
    backgroundColor: "#03C75A",
  },
  icon: {
    position: "absolute",
    left: 22,
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
  },
  signupButton: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 15,
    color: "#03C75A",
    top:40,
  },
});

export default styles;
