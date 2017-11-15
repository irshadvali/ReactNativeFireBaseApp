import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ListView,
    StatusBar
} from "react-native";
import AddUserStyle from "../styles/AddUserStyle";
import firebase from "firebase";
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id
});
let listGroup = [];
class Home extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: ds.cloneWithRows(listGroup),
            loading: false
        };
    }

    componentWillMount() {
        this.setState({ loading: true });
        var groupRef = "/userlist/" + firebase.auth().currentUser.uid + "/group";
        return firebase
            .database()
            .ref(groupRef)
            .on("value", snapshot => {
                listGroup = [];
                snapshot.forEach(child => {
                    listGroup.push({
                        GroupId: child.val().GroupId,
                        GroupName: child.val().GroupName
                    });
                });
                this.setState({ dataSource: ds.cloneWithRows(listGroup) });
                this.setState({ loading: false })
            })
    }

    goToContactList() {
        var { navigate } = this.props.navigation;
        navigate("ContactList", {});
    }

    goToChat(row) {
        var { navigate } = this.props.navigation;
        navigate("Chat", { chatDetails: row });
    }

    renderRow(row, id) {
        return (
            <TouchableOpacity 
        style={{
          justifyContent: "center",
          marginLeft: 15,
          marginRight: 15,
          marginTop: 5,
          padding: 5,
          backgroundColor: "#dddddd",
          borderRadius: 3
        }}
      onPress={this.goToChat.bind(this, row)}>
                <View>
                    <Text style={AddUserStyle.textstyle}>{row.GroupName}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={AddUserStyle.Loadingcontainer}>
                    <ActivityIndicator />
                </View>
            );
        }
        else {
            return (
                <View style={AddUserStyle.container}>
                 <StatusBar backgroundColor="#212733" barStyle="light-content"/>
                    <View style={AddUserStyle.headerBackground}>
                        <View style={AddUserStyle.headerContainer}>
                            <Text style={AddUserStyle.headerTxt}> Home</Text>
                            <TouchableOpacity onPress={this.goToContactList.bind(this)}>
                                <Image
                                    style={AddUserStyle.plusIconStyle}
                                    source={require("../image/plusiconWhite.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <TouchableOpacity
                    style={AddUserStyle.Buttonstyle} 
                    onPress={this.goToContactList.bind(this)}
                    underlayColor="red">
                    <Text style={AddUserStyle.textstyle}>Create Group</Text>
                </TouchableOpacity> */}

                    <ListView
                        style={{
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        dataSource={this.state.dataSource}
                        renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
                    />
                </View>
            );
        }
    }
}

export default Home;
