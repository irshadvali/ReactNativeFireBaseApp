import { StyleSheet } from "react-native";
const DEVICE_WIDTH = Dimensions.get("window").width;
import Dimensions from "Dimensions";

const AddUserStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
Loadingcontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#dddddd",
    justifyContent: "center"
  },
  headerBackground: {
    height: 56,
    backgroundColor: "#212733",
    justifyContent: "center",
    fontWeight: "bold"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerTxt: {
    color: "white",
    fontSize: 20,
    marginLeft: 10
  },
  plusIconStyle: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  loadercontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#dddddd",
    justifyContent: "center"
  },

  InputStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
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

  textGroupstyle: {
    color: "#000000",
    fontSize: 16,

    marginLeft: 15,
    marginRight: 15,
    marginTop: 20
  },
  textstyle: {
    color: "#000000",
    fontSize: 16,
    padding: 15
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
  }
});

export default AddUserStyle;
