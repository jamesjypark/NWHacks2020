import React from 'react';

import {Text, View, Alert} from 'react-native';

import Card from '../common/Card';
import Link from '../common/Link';

class SearchScreen extends React.Component {
  onPress = url => {
    const queryObject = {
      url: url,
      type: 'get',
    };
    // text query object to server
    Alert.alert('going to ' + url);
  };
  render() {
    const {results} = this.props;
    return (
      <View>
        <Text>Search bar</Text>
        {results.length === 0 ? (
          <View>
            <Text>hmmm...</Text>
            <Text>sorry, we couldn't find any results for that query</Text>
          </View>
        ) : (
          results.map(element => {
            if (element.type === 'card') {
              return (
                <View>
                  <Text>here you go</Text>
                  <Card {...element} onPress={this.onPress} />
                  <Text>more results</Text>
                </View>
              );
            } else {
              return <Link {...element} onPress={this.onPress} />;
            }
          })
        )}
      </View>
    );
  }
}

export default SearchScreen;
