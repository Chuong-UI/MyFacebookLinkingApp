/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './assets/components/common/loginButton';
import Header from './assets/components/partials/header';
import MainContent from './assets/components/partials/main';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
})
export default class MyApp extends Component {
  constructor () {
    super();
    this.state = {
      user: {},
      ready: false,
      logged: false
    };
  }

  componentWillMount () {
    const self = this;
    // return AsyncStorage.getItem('user').then(function (result) {
    //   if (result && ''+result!='undefined') {
    //     // self.state.user = JSON.parse(result);
    //     self.setState({user: JSON.parse(result), ready: true});
    //   }
    // });
    AsyncStorage.getItem('token').then( (oldToken) => {
      this.initUser(oldToken);
    })

    this.initUser = (token) => {
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            // alert('Session Expired');
            console.log('ERROR');
            this.setState({ready: true});
            return;
          }
          else {
            this.setState({
              user: {
                name: json.name,
                picture: json.picture,
              },
              ready: true,
              logged: true
            });
            AsyncStorage.setItem('token', token);
          }
        })
        .catch(() => {
        })
    }

    var logout = () => {
      AsyncStorage.setItem('token', '');
      this.setState({logged: false})
    }
    this.facebookHandle = {
      logout: logout,
      initUser: this.initUser,
    }
  }
  render() {
    if (this.state.ready) {
      return (
        <View style={styles.container}>
          <Header user={this.state.user} facebookHandle={this.facebookHandle} logged={this.state.logged} />
          { this.state.logged && 
            <MainContent />
          }
          <MapView
            style={{height: 200}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
    else return (
      <View><Text>Loading</Text></View>
    );
  }
}


AppRegistry.registerComponent('MyApp', () => MyApp);
