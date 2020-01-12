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

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SmsListener from 'react-native-android-sms-listener';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    console.log('component mounted');
    SmsListener.addListener(message => {
      Alert.alert(message.body);
    });
  }

  sendText = () => {
    NativeModules.SendSMS.sendText('7786771604', this.state.query);
  };

  onChangeQuery = query => {
    this.setState({query});
  };

  render() {
    const {query} = this.state;
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.onChangeQuery(text)}
              value={query}
            />
            <Button title="Search" onPress={this.sendText} />
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
