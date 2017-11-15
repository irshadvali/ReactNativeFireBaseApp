import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LandingPage from "./src/LandingPage";
import firebase from 'firebase';
import { Provider } from "react-redux";
import { createStore } from "redux";
import configureStore from "./src/store/configStore";
const store = configureStore();

class App extends Component {
  
   componentWillMount() {
  
    var config = {
      apiKey: "AIzaSyAtWuhvLp-ApLQ8UQxeUBha_EFnHI5vZ1M",
      authDomain: "fcm-notification-5bc7a.firebaseapp.com",
      databaseURL: "https://fcm-notification-5bc7a.firebaseio.com",
      projectId: "fcm-notification-5bc7a",
      storageBucket: "fcm-notification-5bc7a.appspot.com",
      messagingSenderId: "76878128095"
    };
    firebase.initializeApp(config);
    console.disableYellowBox = true;
    }
  render() {
  return (
      <Provider store={store}>
          <LandingPage />
        </Provider>
      );
    }
  }
  export default App;