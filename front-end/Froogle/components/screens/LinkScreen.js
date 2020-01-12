import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import he from 'he';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import { GLOBAL_STYLES } from '../../constants/globalStyles';
import { GREY_COLOR } from '../../constants/hexcodes';

/**
 * Class that renders the Link screen with a
 * single, more detailed response.
 */
class LinkScreen extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    onChangeQuery: PropTypes.func.isRequired,
    submitQuery: PropTypes.func.isRequired,
    currQuery: PropTypes.string.isRequired,
    goToMainScreen: PropTypes.func.isRequired,
  }

  render() {
    const { results, onChangeQuery, submitQuery, currQuery, goToMainScreen } = this.props;
    return (
      <StyleView>
        <SearchBar 
          onChangeQuery={onChangeQuery} 
          submitQuery={submitQuery} 
          currQuery={currQuery}
          goToMainScreen={goToMainScreen}
        />
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={GLOBAL_STYLES.subheader1}>here's the result</Text>
            <Text style={GLOBAL_STYLES.bodyText1}>
              {results.length > 0 ? he.decode(results[0].desc) : 'loading'}
            </Text>
          </View>
        </View>
      </StyleView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 'auto',
    height: 'auto',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GREY_COLOR,
  },
  cardText: {
    height: 'auto',
    padding: 15,
  },
});

export default LinkScreen;