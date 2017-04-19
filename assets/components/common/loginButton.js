import React, { Component } from 'react';
import {
  View
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


var Login = React.createClass({
  componentWillMount: function () {
  
  },
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {this.props.clickHandle(error, result)}
          }
          onLogoutFinished={() => this.props.logOut()}/>
      </View>
    );
  }
});

module.exports = Login;