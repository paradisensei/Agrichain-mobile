import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import MyCamera from './my_camera';

export default class Main extends Component<{}> {
  render() {
    return (
      <TouchableHighlight
        onPress={this.openCamera}
      >
      <Text>Take a photo!</Text>
      </TouchableHighlight>
    );
  }

  openCamera() {

  }
}

const styles = StyleSheet.create({
});
