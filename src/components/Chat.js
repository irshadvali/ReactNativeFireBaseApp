import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ListView, Image,StatusBar,Keyboard } from 'react-native';
import styles from "../styles/ChatStyle"
import firebase from 'firebase';
import moment from "moment"
import { StackNavigator, NavigationActions } from "react-navigation";
import { clearText,updateText } from "../action/chatList.action"
import { connect } from "react-redux";
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id
});
let listMessages = [];

class Chat extends Component {
    static navigationOptions = {
        title: "CHAT",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#212733" },
        headerTitleStyle: { color: "#FFFFFF" }
      };
  


    constructor(props) {
        super(props);
    var yourTextInputRef;
        this.state = {
            dataSource: ds.cloneWithRows(listMessages),
            loading: false,
            message: '',
            displayName:'',

        };
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({ loading: true })
        

        var UserRef = '/user/' + firebase.auth().currentUser.uid;
         firebase.database().ref(UserRef).once('value').then(snapshot => {
              snapshot.forEach((child) => {
                  if(child.key == 'DisplayName')
                    {
                   this.setState({ displayName: child.val()})
                    }
            });
       
          }).catch(

          )


        var chatRef = '/message/' + params.chatDetails.GroupId;
        return firebase.database().ref(chatRef).on('value', snapshot => {
           listMessages = [];
            snapshot.forEach((child) => {
                listMessages.push({
                    MessageText: child.val().text,
                    senderId: child.val().idSender,
                    receiverId: child.val().idReceiver,
                    timeStamp: child.val().timestamp,
                    name:child.val().displayName
                });
            });

            this.setState({ dataSource: ds.cloneWithRows(listMessages) });

        })

       
      

    }

    goToContactList() {
        var { navigate } = this.props.navigation;
        navigate("ContactList", {})
    }

    addMessagetoChat() {
        if(this.props.messagedText.length !=0)
         {
        this.input.clear();
        var MsgText=this.props.messagedText;
        Keyboard.dismiss(); 
         this.props.clearText('');
        const { params } = this.props.navigation.state;
        const idreceiver = params.chatDetails.GroupId;
        var currentDate = new Date();
        var timeinMilliSec = currentDate.getTime();
        const msgId = 'Msg' + timeinMilliSec

        const Messages = {};

        Messages.text = MsgText;
        Messages.idSender = firebase.auth().currentUser.uid;
        Messages.idReceiver = idreceiver;
        Messages.timestamp = timeinMilliSec;
        Messages.displayName=this.state.displayName;

        let MessagePath = '/message/' + params.chatDetails.GroupId+ "/" + msgId;
        return firebase.database().ref(MessagePath).set(Messages).then(result => this.updateList(result))
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }
    }

    updateList(result) {
     this.props.clearText('')
    }

    convertTimeStampToDate(timestamp)
    {
       var formatted = moment(timestamp, "x").format("DD MMM hh:mm a");
       return formatted
    }
    renderRow(row, id) {
        if(row.senderId == firebase.auth().currentUser.uid)
            {
        return (
             <View style={styles.msgRightStyle}>
                 <View style={styles.emailLabel}>
                    <Text style={styles.dispalyNameTextStyle}>{row.name}</Text>
                     <Text style={styles.MessageTextStyle}>{row.MessageText}</Text>
                      <Text style={styles.DateTimeStyle}>{this.convertTimeStampToDate(row.timeStamp)}</Text>
                    </View>
                </View>
        );
            }
    else{
        return(
      <View style={styles.msgLeftStyle}>
          
           <View style={styles.msgLeftTextStyle}>
                    <Text style={styles.dispalyNameTextStyle}>{row.name}</Text>
                     <Text style={styles.MessageTextStyle}>{row.MessageText}</Text>
                      <Text style={styles.DateTimeStyle}>{this.convertTimeStampToDate(row.timeStamp)}</Text>
                    </View>

                </View>
        );
    }
    }



    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor="#212733" barStyle="light-content"/>
                <ListView
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
                />
                <View style={styles.SendWrapper}>

                    <TextInput
                        style={styles.InputStyle}
                        ref={(input) => this.input = input}
                        onChangeText={text => this.props.updateText(text)}
                        placeholderTextColor='#dddddd'
                        underlineColorAndroid='transparent'
                     
                    />
                    <View style={styles.sendButtonStyle}>
                    <TouchableOpacity   onPress={this.addMessagetoChat.bind(this)}>
                        <Image
                            style={styles.ImageStyle}
                            source={require("../image/send_message_button.png")}
                        />
                    </TouchableOpacity>
                    </View>
                    </View>
            </View>);


    }
}

const mapStateToProps = state => {
  return {
  messagedText: state.chatList.messagedText
  };
};

export default connect(mapStateToProps, {
clearText,updateText
})(Chat);
