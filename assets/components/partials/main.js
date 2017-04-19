import React, { Component } from 'react';
import Login from '../common/loginButton';
import {
  View, Image, Text, StyleSheet, TouchableOpacity, Button
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog
} = FBSDK;

const ImagePicker = require('react-native-image-picker');

const options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const MainContent = React.createClass({
  
  componentWillMount: function () {
    this.state = {
      imageSrc: {
        uri: ''
      }
    }
    this.showImagePicker = () => {
      ImagePicker.launchCamera(options, (response)  => {
        if (response.didCancel) {
          return;
        }
        let source = { uri: response.uri };
        this.setState({imageSrc: source})

      });
    }

    this.postToFacebook = () => {
      let sharePhotoContent = {
        contentType: 'photo',
        photos: [
          {
            imageUrl: this.state.imageSrc.uri,
            userGenerated: false,
            caption: "Hello World"
          }
        ]
      };
      console.log(ShareDialog);
      ShareDialog.canShow(sharePhotoContent).then(
        (canShow) => {
          if (canShow) {
            return ShareDialog.show(sharePhotoContent);
          }
        }
      ).then( (result) => {
        console.log(result);
      })
    }
  },
  
  render: function() {
    return (
      <View style={{flexDirection: 'column',
                    padding: 10}}>
        <Button style={{marginBottom: 15}} title="Take Picture" onPress={this.showImagePicker}></Button>
        <View style={{height: 15}}></View>
        {this.state.imageSrc.uri!="" &&
          <Image source={this.state.imageSrc} style={{width: 150,height: 200}} />
        }
        <View style={{height: 15}}></View>
        <Button style={{marginTop: 15}} title="Post it to facebook" onPress={this.postToFacebook}></Button>
      </View>
    )
  }
});

module.exports = MainContent;