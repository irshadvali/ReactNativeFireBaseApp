import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AddUserStyle from "../styles/AddUserStyle"
import { StackNavigator, NavigationActions } from "react-navigation";
import firebase from 'firebase';
export const ResetLogin = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: "Home" })]
});


class Login extends Component {

    static navigationOptions = {
        title: 'LOGIN',
    };

    state = {
        password: "",
        email: "",
        loading: false,
        result: '',
        loginStatus: true,
    };

    handlePassword = text => {
        this.setState({ password: text });
    };

    handleEmail = text => {
        this.setState({ email: text });
    };


    componentWillMount() {

        firebase.auth().onAuthStateChanged(user => {

            if (user) {
                this.setState({ loginStatus: true });
                //   var { navigate } = this.props.navigation;
                //   navigate("Home", {})
                this.props.navigation.dispatch(ResetLogin);
            }
            else {
                this.setState({ loginStatus: false });
            }
        });
    }


    //add user onClick of Button
    LoginUser = () => {
        this.setState({
            loading: true
        });
        var { navigate } = this.props.navigation;
        let email = this.state.email;
        let password = this.state.password;
        firebase.auth()
            .signInWithEmailAndPassword(email, password).then((userData) => {
                this.setState({
                    loading: false
                });
                 this.props.navigation.dispatch(ResetLogin);
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    SignUpUser() {
        var { navigate } = this.props.navigation;
        navigate("SignUp", {})
    }


    renderLoginBtn() {
        if (this.state.loading) {
            return (
                <View
                  style={AddUserStyle.Buttonstyle}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    style={AddUserStyle.Buttonstyle}
                    onPress={this.LoginUser.bind(this)}
                    underlayColor="red"
                >
                    <Text style={AddUserStyle.textstyle}>LOGIN</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        if (this.state.loginStatus == false) {
            return (
                <View style={AddUserStyle.container}>
                    <Text style={AddUserStyle.textHeaderstyle}>Login Details</Text>
                    <TextInput
                        style={AddUserStyle.InputStyle}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#74787f"
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={this.handleEmail}
                    />
                    <TextInput
                        style={AddUserStyle.InputStyle}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#74787f"
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={this.handlePassword}
                    />
                    {this.renderLoginBtn()}

                    <TouchableOpacity
                        onPress={this.SignUpUser.bind(this)}
                        underlayColor="red">
                        <Text style={AddUserStyle.textSignUpstyle}>Are you New User? SignUp Here.</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={this.SignUpUser} underlayColor="red"> <Text style={AddUserStyle.textHeaderstyle}> Sign Up Here </Text></TouchableOpacity> */}
                </View>
            );
        }
        else {
            return (
                <View style={AddUserStyle.loadercontainer}>
                    <ActivityIndicator />
                </View>
            );
        }
    }
}

export default Login;
