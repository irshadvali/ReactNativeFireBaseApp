import { StyleSheet } from "react-native";
const DEVICE_WIDTH = Dimensions.get("window").width;
import Dimensions from "Dimensions";

const ChatStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },

    InputStyle: {
       height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        color: "#000000",
        backgroundColor: "#ffffff",
        borderRadius: 3,
        flex: 0.85,
    },
      ImageStyle: {
     width: 25,
     height: 25
     },

    Buttonstyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom:10,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        color: "white",
        backgroundColor: "#182d4c",
        borderRadius: 3,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
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
        marginTop: 20,
    },

      textSignUpstyle: {
        color: "#d30e2f",
        fontSize: 18,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    },
    SendWrapper: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  sendButtonStyle:{
    backgroundColor:'#212733',
    flex:0.15,
    height:50,
    alignItems:'center',
    justifyContent:'center'
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
     backgroundColor:'#D4EFDF',
     padding:5,
     borderRadius:3,
     fontSize: 12,
     color: "#000000",

  },
  msgLeftStyle:{
    justifyContent: "center",
     alignItems: 'flex-start',
     marginRight: 5,
     marginLeft: 5,
     padding: 10,
  },
  msgRightStyle:{
    justifyContent: "center",
    alignItems: 'flex-end',
    marginLeft: 5,
    marginRight: 5,
    padding: 10
  },
  msgLeftTextStyle:{
    backgroundColor:'#B0E0E6',
    padding:5,
    borderRadius:3,
    fontSize: 12,
    color: "#000000",

  },
   MessageTextStyle:{
  fontSize: 14,
    color: "#000000",
       justifyContent: "center",
       padding:5,
     alignItems: 'center',
  },

   dispalyNameTextStyle:{
    fontSize: 10,
    color: "#7a7a7a",
      alignItems: 'flex-start',
  },

  DateTimeStyle:
{
    fontSize: 10,
    color: "#7a7a7a",
    justifyContent: "center",
    alignItems: 'flex-end',
  }

});

export default ChatStyle;
