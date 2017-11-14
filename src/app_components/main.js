import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import MyCamera from './my_camera';

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: 'Agrichain'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text>Logo here</Text>
        </View>

        <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
          <TouchableHighlight
            style={[styles.button]}
            onPress={this.openCamera.bind(this)}
            underlayColor='#dddddd'
          >
            <View style={styles.inline}>
              <Text style={styles.buttonText}>Take a photo!</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  openCamera() {
    const { navigate } = this.props.navigation;
    navigate('MyCamera');
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  logo: {
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 30,
    backgroundColor: '#f2f2f2'
  },
  buttonText: {
    fontSize: 20,
    color: 'black'
  },
  inline: {
    flexDirection: 'row'
  }
});

