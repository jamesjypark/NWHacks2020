import React from 'react';

import {Text, View} from 'react-native';

class LinkScreen extends React.Component {
  render() {
    const {results} = this.props;
    return (
      <View>
        <Text>{results[0].desc}</Text>
      </View>
    );
  }
}

export default LinkScreen;
