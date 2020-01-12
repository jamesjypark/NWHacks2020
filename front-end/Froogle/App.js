import React from 'react';
import { ScrollView, NativeModules } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

import SearchScreen from './components/screens/SearchScreen';
import LinkScreen from './components/screens/LinkScreen';
import MainScreen from './components/screens/MainScreen';
import parseSMS from './functions/parseSMS';
import { END_OF_MESSAGE, API_PHONE_NUMBER, QUERY_TYPES } from './constants/constants';

let isReceivingSMS = false;
let currentBuildingSMS = '';
let lastMessage = '';
let subscription = null;

/**
 * Class that renders the main application, and
 * handles routing between screens. Most querying
 * logic is also handled by this class.
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currQuery: '',
      linkSelected: false,
    };
  }

  /**
   * Method that checks for incoming SMS messages,
   * and combines and parses them into a single
   * string.
   */
  componentDidMount() {
    SmsListener.addListener(message => {
      console.log('message', message);
      if (isReceivingSMS) {
        currentBuildingSMS += message.body;
      } else {
        isReceivingSMS = true;
        currentBuildingSMS = message.body;
      }
      if (message.body.includes(END_OF_MESSAGE)) {
        console.log('sms', currentBuildingSMS);
        this.setState(
          {
            results: parseSMS(currentBuildingSMS).reverse(),
          },
          () => (currentBuildingSMS = ''),
        );
        isReceivingSMS = false;
      }
    });
  }

  /**
   * Method that sets the query from the user input field.
   * 
   * @param {String} query
   */
  onChangeQuery = query => this.setState({ currQuery: query });

  /**
   * Method that sends an SMS request to retrieve results 
   * from the given URL.
   * 
   * @param {String} url
   */
  onLinkPress = url => {
    this.setState({ linkSelected: true, });
    this.sendText({
      type: QUERY_TYPES.GET,
      url,
    });
  };

  /**
   * Method that sends an SMS request to retrieve the results
   * from the given search string.
   */
  sendQuery = () => {
    this.setState({
      linkSelected: false,
      results: null,
    });
    this.sendText({
      type: QUERY_TYPES.SEARCH,
      query: this.state.currQuery,
    });
  };

  /**
   * Method that sends a text message to the API.
   * 
   * @param {Object} queryObject
   */
  sendText = queryObject => (
    NativeModules.SendSMS.sendText(API_PHONE_NUMBER, JSON.stringify(queryObject))
  );

  /**
   * Method that results state variables to their defaults
   * to redirect the user back to the main screen.
   */
  goToMainScreen = () => this.setState({
    results: undefined,
    linkSelected: false,
    currQuery: ''
  });

  componentWillUnmount() {
    subscription.remove();
  }

  render() {
    const { results, linkSelected, currQuery } = this.state;

    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {results || results === null ? (
          linkSelected || linkSelected === null ? (
            <LinkScreen
              results={results}
              onChangeQuery={this.onChangeQuery}
              submitQuery={this.sendQuery}
              goToMainScreen={this.goToMainScreen}
              currQuery={currQuery}
            />
          ) : (
              <SearchScreen
                results={results}
                onChangeQuery={this.onChangeQuery}
                submitQuery={this.sendQuery}
                onLinkPress={this.onLinkPress}
                goToMainScreen={this.goToMainScreen}
                currQuery={currQuery}
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