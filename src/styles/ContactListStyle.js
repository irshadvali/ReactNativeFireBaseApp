import { StyleSheet } from "react-native";
const DEVICE_WIDTH = Dimensions.get("window").width;
import Dimensions from "Dimensions";

const ContactListStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#dddddd"
  },
  headerView: {
    height: 56,
    backgroundColor: "#212733",
    justifyContent: "center",
    fontWeight: "bold"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerSubContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  backArrowImg: {
    width: 25,
    height: 25,
    marginLeft: 10
  },
  headerTxt: {
    color: "white",
    fontSize: 20,
    marginLeft: 10
  },
  plusImg: {
    width: 25,
    height: 25,
    marginRight: 10
  },

  Loadingcontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#dddddd",
    justifyContent: "center"
  },

  InputStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 3
  },

  Buttonstyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    color: "white",
    backgroundColor: "#182d4c",
    borderRadius: 3,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
  },

  textstyle: {
    color: "white",
    fontSize: 14
  },

  textHeaderstyle: {
    color: "#000000",
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20
  },

  textSubHeaderstyle: {
    color: "#000000",
    fontSize: 14,
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },

  textSignUpstyle: {
    color: "#d30e2f",
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20
  },
  slideInputWrapper: {
    flexDirection: "row",
    height: 60,
    padding: 10,
    alignItems: "center"
  },
  circleView: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#ffffff"
  },
  circleViewSelected: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#4dcba8"
  },
  listItemText: {
    flexDirection: "column",
    justifyContent: "center"
  },
  nameLabel: {
    fontSize: 14,
    color: "#000000",
    left: 10,
    height: 18
  },
  emailLabel: {
    fontSize: 12,
    color: "#000000",
    left: 10
  }
});

export default ContactListStyle;
