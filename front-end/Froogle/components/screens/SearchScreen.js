import React from 'react';

import {StyleSheet, Text, View, Alert} from 'react-native';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import Card from '../common/Card';
import Link from '../common/Link';

import {GLOBAL_STYLES} from '../../constants/globalStyles';

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
    // const {results} = this.props;
    const results = [];
    return (
      <StyleView>
        <SearchBar />
        {results.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={GLOBAL_STYLES.header}>hmmm...</Text>
            <Text style={GLOBAL_STYLES.bodyText1}>
              sorry, we couldn't find any results for that query
            </Text>
          </View>
        ) : (
          results.map(element => {
            if (element.type === 'card') {
              return (
                <View>
                  <Text style={GLOBAL_STYLES.headerLeft}>here you go</Text>
                  <Card {...element} onPress={this.onPress} />
                  <Text style={GLOBAL_STYLES.subheader1}>more results</Text>
                </View>
              );
            } else {
              return <Link {...element} onPress={this.onPress} />;
            }
          })
        )}
      </StyleView>
    );
  }
}

export default SearchScreen;

const styles = StyleSheet.create({
  noResultContainer: {
    width: 'auto',
    height: 'auto',
    marginTop: 100,
    marginBottom: 10,
    textAlign: 'center',
  },
});
