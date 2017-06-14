import React, { Component } from 'react';
import _ from 'lodash';
import {
  View, TextInput
} from 'react-native';


var Autocomplete = React.createClass({
  componentWillMount: function () {
    this.updateText = (e) => {
      console.log(e);
    }

    this.props.items = this.props.items || ['AAA', 'BBB', 'CCC']
  },
  render: function() {
    return (
      <View>
        <TextInput placeholder="Search"
                    onChange={(event) => this.updateText(event)}/>
        {
          this.props.items && this.props.items.length &&
          <View>
          {
            _.map(this.props.items, (item) => {
              return <Text>{item}</Text>
            })
          }
          </View>
        }
      </View>
    );
  }
});

module.exports = Autocomplete;