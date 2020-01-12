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
import MainScreen from './components/screens/MainScreen';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currQuery: '',
      linkSelected: false,
    };
  }

  componentDidMount() {
    SmsListener.addListener(message => {
      Alert.alert(message.body);
    });
  }

  sendText = () => NativeModules.SendSMS.sendText('7786777623', this.state.currQuery);

  onChangeQuery = query => {
    this.setState({currQuery: query});
  };

  render() {
    // const { result, linkSelected } = this.state;
    const linkSelected = false;
    const results = [
      {
        type: 'card',
        title: 'A very cool title',
        desc:
          'Cool titles are titles that are very cool but is often considered cooler than normal titles',
        url: 'link 1',
      },
      {
        title: 'A not cool title',
        desc:
          'Cool titles are titles that are very cool and I am very tired but this is fun so it is ok',
        url: 'link 2',
      },
      {
        title: 'A somewhat cool title',
        desc:
          'Cool titles are titles that are very cool but is it really worth having this much fun to build?',
        url: 'link 3',
      },
    ];
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {results ? (
          linkSelected ? (
            <LinkScreen results={results} />
          ) : (
            <SearchScreen results={results} />
          )
        ) : (
          <MainScreen onChangeQuery={this.onChangeQuery} submitQuery={this.sendText} />
        )}
      </ScrollView>
    );
  }
}

export default App;
