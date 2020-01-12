import React from 'react';
import {ScrollView, Alert, NativeModules} from 'react-native';

import SearchScreen from './components/screens/SearchScreen';
import LinkScreen from './components/screens/LinkScreen';
import SmsListener from 'react-native-android-sms-listener';
import MainScreen from './components/screens/MainScreen';

import parseSMS from './functions/parseSMS';

const receiverNumber = '7786771604';

let isReceivingSMS = false;
let currentBuildingSMS = '';

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
      if (isReceivingSMS) {
        currentBuildingSMS += message.body;
        if (message.body.includes('END')) {
          this.setState({
            results: parseSMS(currentBuildingSMS),
          });
          isReceivingSMS = false;
        }
      } else {
        isReceivingSMS = true;
        currentBuildingSMS = message.body;
      }
    });
  }

  onLinkPress = url => {
    const queryObject = {
      type: 'get',
      url,
    };
    this.sendText(queryObject);
    this.setState({
      linkSelected: true,
    });
  };

  sendQuery = () => {
    this.setState({
      linkSelected: false,
      results: null,
    });
    const queryObject = {
      type: 'search',
      query: this.state.currQuery,
    };
    this.sendText(queryObject);
  };

  sendText = queryObject => {
    NativeModules.SendSMS.sendText(receiverNumber, JSON.stringify(queryObject));
  };

  onChangeQuery = query => {
    this.setState({currQuery: query});
  };

  render() {
    const {results, linkSelected} = this.state;
    // const linkSelected = false;
    // const results = [
    //   {
    //     type: 'card',
    //     title: 'A very cool title',
    //     desc:
    //       'Cool titles are titles that are very cool but is often considered cooler than normal titles',
    //     url: 'link 1',
    //   },
    //   {
    //     title: 'A not cool title',
    //     desc:
    //       'Cool titles are titles that are very cool and I am very tired but this is fun so it is ok',
    //     url: 'link 2',
    //   },
    //   {
    //     title: 'A somewhat cool title',
    //     desc:
    //       'Cool titles are titles that are very cool but is it really worth having this much fun to build?',
    //     url: 'link 3',
    //   },
    // ];

    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {results || results === null ? (
          linkSelected || linkSelected === null ? (
            <LinkScreen
              results={results}
              onChangeQuery={this.onChangeQuery}
              submitQuery={this.sendQuery}
            />
          ) : (
            <SearchScreen
              results={results}
              onChangeQuery={this.onChangeQuery}
              submitQuery={this.sendQuery}
              onLinkPress={this.onLinkPress}
            />
          )
        ) : (
          <MainScreen
            onChangeQuery={this.onChangeQuery}
            submitQuery={this.sendQuery}
          />
        )}
      </ScrollView>
    );
  }
}

export default App;
