import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  NativeModules,
  TextInput,
  Button,
} from 'react-native';

import SearchScreen from './components/screens/SearchScreen';
import LinkScreen from './components/screens/LinkScreen';
import SmsListener from 'react-native-android-sms-listener';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currQuery: '',
      linkSelected: false,
    };
  }

  componentDidMount() {
    console.log('component mounted');
    SmsListener.addListener(message => {
      Alert.alert(message.body);
    });
  }

  sendText = () => {
    NativeModules.SendSMS.sendText('7786771604', this.state.currQuery);
  };

  onChangeQuery = query => {
    this.setState({currQuery: query});
  };

  render() {
    // const { result, linkSelected } = this.state;
    const linkSelected = true;
    const results = [
      {
        type: 'card',
        title: 'A very cool title',
        desc: 'Cool titles are titles that are very cool',
        url: 'link 1',
      },
      {
        title: 'A not cool title',
        desc: 'Cool titles are titles that are very cool',
        url: 'link 2',
      },
      {
        title: 'A somewhat cool title',
        desc: 'Cool titles are titles that are very cool',
        url: 'link 3',
      },
    ];
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {results ? (
          linkSelected ? (
            <LinkScreen />
          ) : (
            <SearchScreen results={results} />
          )
        ) : (
          <Text>MainScreen</Text>
        )}
      </ScrollView>
    );
  }
}

export default App;
