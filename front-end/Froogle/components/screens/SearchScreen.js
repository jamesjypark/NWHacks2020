import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import Card from '../common/Card';
import Link from '../common/Link';
import { TEAL_COLOR } from '../../constants/hexcodes';
import { GLOBAL_STYLES } from '../../constants/globalStyles';
import { CARD_RESPONSE_TYPE } from '../../constants/constants';

/**
 * Class that renders the search screen, with
 * a list of results for searches, as well as
 * the searchbar.
 */
class SearchScreen extends React.Component {
  static propTypes = {
    results: PropTypes.array,
    onChangeQuery: PropTypes.func.isRequired,
    submitQuery: PropTypes.func.isRequired,
    currQuery: PropTypes.string.isRequired,
    goToMainScreen: PropTypes.func.isRequired,
  }
  
  render() {
    const { results, onChangeQuery, submitQuery, currQuery, goToMainScreen } = this.props;
    const isLoading = results === null;

    return (
      <StyleView>
        <SearchBar 
          onChangeQuery={onChangeQuery} 
          submitQuery={submitQuery} 
          currQuery={currQuery}
          goToMainScreen={goToMainScreen} 
        />
        {results && results.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={GLOBAL_STYLES.header}>hmmm...</Text>
            <Text style={GLOBAL_STYLES.bodyText1}>
              sorry, we couldn't find any results for that query
            </Text>
          </View>
        ) : results ? (
          results.map((element, index) => {
            if (element.type === CARD_RESPONSE_TYPE) {
              return (
                <View key={`card-${index}`}>
                  <Text style={GLOBAL_STYLES.headerLeft}>here you go</Text>
                  <Card {...element} onPress={this.props.onLinkPress} />
                  <Text style={GLOBAL_STYLES.subheader1}>more results</Text>
                </View>
              );
            } else {
              return <Link key={`link-${index}`} {...element} onPress={this.props.onLinkPress} />;
            }
          })
        ) : (
              <ActivityIndicator
                style={styles.mainScreenLoader}
                animating={isLoading}
                color={TEAL_COLOR}
                size="large"
              />
            )}
      </StyleView>
    );
  }
}

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
    transform: [{ scale: 1.75 }],
  },
});

export default SearchScreen;