import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';

import Spinner from './core/spinner';
import Environment from '../environment/environment';

export default class MyCamera extends Component {
  constructor() {
    super();

    this.state = {loading: false};
  }

  static navigationOptions = {
    title: 'Take a photo of your goods'
  };

  render() {
    // TODO: make this spinner work properly
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

          <Text style={styles.capture} onPress={this.placeProduct.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  placeProduct() {
    this.takePicture();
    this.getCurrentPosition();
  }

  takePicture() {
    this.camera.capture()
      .then(data => {
        console.log("Hello!");

        const formData = new FormData();
        formData.append('photo', {
          uri: data.mediaUri, name: 'photo.jpg', type: 'image/jpg'
        });

        return fetch(Environment.PHOTO_UPLOAD_PATH, {
           method: 'POST',
           headers: {
             'Content-Type': 'multipart/form-data;'
           },
           body: formData,
        });
      })
      .catch(err => console.log(err))
      .then(response => {
        console.log("AGAIn");
        // TODO: take hash here...

        // response = JSON.parse(response._bodyText);
        // let count = 0;
        // if (response.images) {
        //   count = response.images[0].faces.length;
        // }
        // console.log(count);
        //  this.setState({
        //    count: count
        //  });
      })
      .catch(err => console.log(err));
  }

  getCurrentPosition() {
    const { navigate } = this.props.navigation;

    navigator.geolocation.getCurrentPosition(
      position => {
        position = _getPosition(position);

        navigate('Results', {position: position});
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