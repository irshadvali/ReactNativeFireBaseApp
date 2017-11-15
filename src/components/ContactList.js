import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  TextInput,
  StatusBar
} from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import firebase from "firebase";
import _ from "lodash";
import styles from "../styles/ContactListStyle";
// import {
//   AvatarHelper
// } from "react-native-ui-lib";
var contactlist = [];
let selectedItem = [];
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
});
let listContactList = [];
let selectedUserStructure = [];
class ContactList extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.copyData = {};
    this.state = {
      dataSource: ds.cloneWithRows(listContactList),
      loading: false,
      GroupName: ""
    };
  }

  //fetch the ContactList
  componentWillMount() {
    this.setState({ loading: true });
    var UserRef = "/userlist";
    return firebase
      .database()
      .ref(UserRef)
      .once("value")
      .then(snapshot => {
        // this.setState({ stores: snapshot.val() })
        listContactList = [];
        snapshot.forEach(child => {
          if (child.val().UID != firebase.auth().currentUser.uid) {
            listContactList.push({
              dispalyName: child.val().DisplayName,
              Email: child.val().Email,
              PhoneNo: child.val().PhoneNo,
              UserId: child.val().UID
            });
          }
         else{
        selectedUserStructure.push({
        dispalyName: child.val().DisplayName,
        Email: child.val().Email,
        PhoneNo:child.val().PhoneNo,
        UserId:  child.val().UID,
      });
         }
        });
        this.copyData = listContactList;
        let newArray = this.copyData.slice();
        {
          _.times(this.copyData.length, i => {
            newArray[i] = {
              ...this.copyData[i],
              isSelected: false
            };
          });
        }
        this.copyData = newArray;
        this.setState({ dataSource: ds.cloneWithRows(this.copyData) });
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  createGroup = () => {
    if(this.state.GroupName.length!= 0)
      {
    this.setState({ loading: true });
    const min = 1;
    const max = 1000;
    const rand = Math.random()
      .toString(36)
      .substr(2, 16);
    const GroupId = "GRP" + rand;

    const Group = {};
    const groupInfo = {};
    groupInfo.name = this.state.GroupName.charAt(0).toUpperCase() + this.state.GroupName.slice(1);
    groupInfo.admin = firebase.auth().currentUser.uid;
    Group.groupInfo = groupInfo;
    Group.groupmembers = selectedUserStructure;
    Group.GID = GroupId;

    let GroupPath = "/group/" + GroupId;
    return firebase
      .database()
      .ref(GroupPath)
      .set(Group)
      .then(result => this.creategroupForUsers(GroupId, (this.state.GroupName.charAt(0).toUpperCase() + this.state.GroupName.slice(1))))
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        this.setState({ loading: false });
      });
      }
  };

  creategroupForUsers(GroupId, Name) {
    var { navigate } = this.props.navigation;
    for (const k = 0; k < selectedUserStructure.length; k++) {
      const groupUserInfo = {};
      groupUserInfo.PhoneNo = selectedUserStructure[k].PhoneNo;
      groupUserInfo.DisplayName = selectedUserStructure[k].dispalyName;
      groupUserInfo.Email = selectedUserStructure[k].Email;
      groupUserInfo.GroupName = Name;
      groupUserInfo.GroupId = GroupId;

      firebase
        .database()
        .ref(/userlist/ + selectedUserStructure[k].UserId + "/group/" + GroupId)
        .set(groupUserInfo)
        .then(console.log("Added"));
    }
    this.setState({ loading: false });
    navigate("Home", {});
  }

  clickMark(row, id) {
    let index = Number(id);
    var clickedindex = "";
    let newArray = this.copyData.slice();
    newArray[index] = {
      ...this.copyData[index],
      isSelected: !this.copyData[index].isSelected
    };
    this.copyData = newArray;
    this.setState({
      dataSource: ds.cloneWithRows(this.copyData)
    });

    var userExist = false;
    for (const k = 0; k < selectedUserStructure.length; k++) {
      if (selectedUserStructure[k].UserId == row.UserId) {
        userExist = true;
        clickedindex = k;
      }
    }
    if (userExist == false) {
      selectedUserStructure.push({
        dispalyName: row.dispalyName,
        Email: row.Email,
        PhoneNo: row.PhoneNo,
        UserId: row.UserId
      });
    }
    if (row.isSelected == true && userExist == true) {
      selectedUserStructure.splice(clickedindex, 1);
    }
  }

  renderRow(row, id) {
    const color = row.isSelected;
    const styleCircular = row.isSelected
      ? styles.circleViewSelected
      : styles.circleView;
    const textColor = row.isSelected ? "#ffffff" : "#000000";
    // const initials = AvatarHelper.getInitials(row.dispalyName);

    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          marginLeft: 5,
          marginRight: 15,
          marginTop: 5,
          padding: 10,
          backgroundColor: "#dddddd",
          borderRadius: 3
        }}
        onPress={this.clickMark.bind(this, row, id)}
      >
        <View style={styles.slideInputWrapper}>
          <View style={styleCircular}>
            <Text style={{ color: textColor }}>
              {" "}
              {row.dispalyName.substring(0, 1)}{" "}
            </Text>
          </View>
          <View style={styles.listItemText}>
            <Text style={styles.nameLabel}>{row.dispalyName}</Text>
            <Text style={styles.emailLabel}>{row.PhoneNo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handleGroupName = text => {
    this.setState({ GroupName: text });
  };

  render() {
    const { goBack } = this.props.navigation;
    if (this.state.loading) {
      return (
        <View style={styles.Loadingcontainer}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
         <StatusBar backgroundColor="#212733" barStyle="light-content"/>
          <View style={styles.headerView}>
            <View style={styles.headerContainer}>
              <View style={styles.headerSubContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goBack();
                  }}
                >
                  <Image
                    style={styles.backArrowImg}
                    source={require("../image/left-arrow.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.headerTxt}> Home</Text>
              </View>
              <TouchableOpacity
              onPress={this.createGroup}>
                <Image
                  style={styles.plusImg}
                  source={require("../image/done.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.textSubHeaderstyle}>Enter the Group Name</Text>
          <TextInput
            style={styles.InputStyle}
            underlineColorAndroid="transparent"
            placeholderTextColor="#74787f"
            autoCapitalize="none"
            placeholder="Enter your goup name"
            onChangeText={this.handleGroupName}
          />

          <Text style={styles.textSubHeaderstyle}>Contacts</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
          />
{/* 
          <TouchableOpacity
            style={styles.Buttonstyle}
            onPress={this.createGroup}
            underlayColor="red"
          >
            <Text style={styles.textstyle}>Create Group</Text>
          </TouchableOpacity> */}
        </View>
      );
    }
  }
}

export default ContactList;
