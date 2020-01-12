import React from 'react';

import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import Card from '../common/Card';
import Link from '../common/Link';

import {TEAL_COLOR} from '../../constants/hexcodes';

import {GLOBAL_STYLES} from '../../constants/globalStyles';

class SearchScreen extends React.Component {
  render() {
    const {results} = this.props;
    const {onChangeQuery, submitQuery} = this.props;
    return (
      <StyleView>
        <SearchBar onChangeQuery={onChangeQuery} submitQuery={submitQuery} />
        {results && results.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={GLOBAL_STYLES.header}>hmmm...</Text>
            <Text style={GLOBAL_STYLES.bodyText1}>
              sorry, we couldn't find any results for that query
            </Text>
          </View>
        ) : results ? (
          results.map(element => {
            if (element.type === 'card') {
              return (
                <View>
                  <Text style={GLOBAL_STYLES.headerLeft}>here you go</Text>
                  <Card {...element} onPress={this.props.onLinkPress} />
                  <Text style={GLOBAL_STYLES.subheader1}>more results</Text>
                </View>
              );
            } else {
              return <Link {...element} onPress={this.props.onLinkPress} />;
            }
          })
        ) : (
          <ActivityIndicator
            style={styles.mainScreenLoader}
            animating={results === null}
            color={TEAL_COLOR}
            size="large"
          />
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
  mainScreenLoader: {
    marginTop: 75,
    transform: [{scale: 1.75}],
  },
});
