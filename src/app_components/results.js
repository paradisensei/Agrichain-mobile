import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const GOOD = t.struct({
  title: t.String,
  imageHash: t.String,
  latitudeBase: t.Number,
  latitudeDec: t.Number,
  longitudeBase: t.Number,
  longitudeDec: t.Number,
  price: t.Number,
  quantity: t.Number
});

import Environment from '../environment/environment';

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

    const imageHash = state.params.imageHash;

    const VALUE = {
      imageHash: imageHash,
      latitudeBase: latitudeWhole,
      latitudeDec: latitudeDecimal,
      longitudeBase: longitudeWhole,
      longitudeDec: longitudeDecimal
    };

    const options = {
      fields: {
        imageHash: {
          editable: false
        },
        latitudeBase: {
          editable: false
        },
        latitudeDec: {
          editable: false
        },
        longitudeBase: {
          editable: false
        },
        longitudeDec: {
          editable: false
        }
      }
    };

    return (
      <ScrollView style={styles.container}>
        <Form
          ref="form"
          type={GOOD}
          value={VALUE}
          options={options}
        />

        <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
          <TouchableHighlight
            style={[styles.button]}
            onPress={this.publish.bind(this)}
            underlayColor='#dddddd'
          >
            <View style={styles.inline}>
              <Text style={styles.buttonText}>Publish goods</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

  publish() {
    var value = this.refs.form.getValue();
    var timestamp = {timestamp: (new Date()).getTime()};
    var key = {key: Environment.KEY};

    var result = Object.assign({}, value, timestamp, key);

    console.log(JSON.stringify(result));

    // send values to the blockchain
    fetch(Environment.INFO_UPLOAD_PATH, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(result)
    })
    .catch(err => console.log(err))
    .then(response => { console.log(response) });

    const { navigate } = this.props.navigation;
    navigate('Main');
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
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