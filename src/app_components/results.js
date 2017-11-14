import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class Results extends Component<{}> {
  static navigationOptions = {
    title: 'Results'
  };

  render() {
    const { state } = this.props.navigation;

    const latitude = state.params.position.latitude;
    const longitude = state.params.position.longitude;

    const latitudeWhole = Math.floor(latitude);
    const latitudeDecimal = Math.floor((latitude % 1) * 1000000000000000);

    const longitudeWhole = Math.floor(longitude);
    const longitudeDecimal = Math.floor((longitude % 1) * 1000000000000000);

    return (
      <View style={styles.container}>
        <Text> {latitudeWhole + " " + latitudeDecimal}  </Text>
        <Text> {longitudeWhole + " " + longitudeDecimal} </Text>

        <View style={{marginLeft: 20, marginRight: 20, marginTop: 40}}>
          <TouchableHighlight
            style={[styles.button]}
            onPress={this.backToMain.bind(this)}
            underlayColor='#dddddd'
          >
            <View style={styles.inline}>
              <Text style={styles.buttonText}>Done</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  backToMain() {
    const { navigate } = this.props.navigation;
    navigate('Main');
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
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