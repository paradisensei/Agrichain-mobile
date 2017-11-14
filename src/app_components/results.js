import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Results extends Component<{}> {
  static navigationOptions = {
    title: 'Results'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {JSON.stringify(this.props.position)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  }
});