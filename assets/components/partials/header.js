import React, { Component } from 'react';
import Login from '../common/loginButton';
import {
  View, Image, Text, StyleSheet, AsyncStorage
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
var Header = React.createClass({
  
  componentWillMount: function () {
    var self = this;
    this.pictureSrc = this.pictureSrc || {
      uri: 'https://www.contentchampion.com/wp-content/uploads/2013/11/avatar-placeholder.png'
    }

    this.loginHandle = (error, result) => {
      if (error) {
        alert("login has error: " + result.error);
      } else if (result.isCancelled) {
        alert("login is cancelled.");
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            this.props.facebookHandle.initUser(data.accessToken.toString());
          }
        )
      }
    };

  },
  
  render: function() {
    if (this.props.user.picture) {
      this.pictureSrc= {
        uri: this.props.user.picture.data.url
      }
    }
    return (
      <View style={[headerStyle.container, {padding: 10, backgroundColor: '#fafafa'}]}>
        {this.props.logged && <Image style={{width: 50, height: 50, marginRight: 15}} source={this.pictureSrc} />}
        {this.props.logged && <Text>{this.props.user.name}</Text>}
        <View style={{flex: 1}}></View>
        <Login style={{width: 50}} clickHandle={this.loginHandle} logOut={this.props.facebookHandle.logout}/>
      </View>
    );
  }
});

module.exports = Header;