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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SmsListener from 'react-native-android-sms-listener';

import MainScreen from './components/screens/MainScreen';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currQuery: '',
    };
  }

  componentDidMount() {
    SmsListener.addListener(message => {
      Alert.alert(message.body);
    });
  }

  sendText = () => {
    NativeModules.SendSMS.sendText('7786771604', this.state.currQuery);
  };

  onChangeQuery = query => {
    this.setState({ currQuery: query });
  };

  render() {
    const { results } = this.state;
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {results 
          ? <Text>SearchScreen</Text> 
          : <MainScreen onChangeQuery={this.onChangeQuery} />
        }
        {/* <View>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.onChangeQuery(text)}
              value={query}
            />
            <Button title="Search" onPress={this.sendText} />
          </View>
        </View> */}
      </ScrollView>
    );
  }
}

export default App;
