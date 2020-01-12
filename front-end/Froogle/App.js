/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  NativeModules,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Communications from 'react-native-communications';

class App extends React.Component {
  // sendText = () => {
  //   Alert.alert('hello');
  //   Communications.text('7783508649', 'hello');
  // };

  sendText = () => {
    console.log(NativeModules);
    console.log(NativeModules.SendSMS);
    let result = NativeModules.SendSMS.sendText(
      '7786771604',
      'hey nilay if this message ever reaches you, remember that you are a genius',
    );
    console.log('result is ' + result);
  };
  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle} onPress={this.sendText}>
              Hello Nilay
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
