import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class MyGeolocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: 0
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        position = getPosition(position);
        console.log("Got initial position: ",
                    "latitude = ", position.latitude,
                    "longitude = ", position.longitude);
        this.setState(position);
      },
      error => console.log(error),
      { timeout: 2000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        position = getPosition(position);
        console.log("Got current position: ",
                    "latitude = ", position.latitude,
                    "longitude = ", position.longitude);

        this.setState(position);
      },
      error => console.log(error),
      { maximumAge: 1000, distanceFilter: 1 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <View>
        <Text>Location:</Text>
        <Text>{getPosition(this.state.position)}</Text>
      </View>
    );
  }
}

function getPosition(position) {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }
}