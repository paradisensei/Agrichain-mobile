import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';

import Spinner from './core/spinner';

export default class MyCamera extends Component {
  constructor() {
    super();

    this.state = {loading: false};
  }

  static navigationOptions = {
    title: 'Take a photo of your goods'
  };

  render() {
    if(this.state.loading)
      return <Spinner/>;

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          type={Camera.constants.Type.back}
          playSoundOnCapture={false}>

          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    // TODO: send picture to the IPFS
    this.setState({loading: true});
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    const { navigate } = this.props.navigation;

    navigator.geolocation.getCurrentPosition(
      position => {
        position = _getPosition(position);

        navigate('Results', {position: position});
        this.setState({loading: false});
      },
      error => console.log(error),
      { timeout: 30000, maximumAge: 1000, enableHighAccuracy: true }
    );
  }
}

function _getPosition(position) {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});