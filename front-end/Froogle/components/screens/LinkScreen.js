import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';

import {GLOBAL_STYLES} from '../../constants/globalStyles';

class LinkScreen extends React.Component {
  render() {
    const {results} = this.props;
    const {onChangeQuery, submitQuery} = this.props;
    return (
      <StyleView>
        <SearchBar onChangeQuery={onChangeQuery} submitQuery={submitQuery} />
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={GLOBAL_STYLES.subheader1}>here's the result</Text>
            <Text style={GLOBAL_STYLES.bodyText1}>
              {results.length > 0 ? results[0].desc : 'loading'}
            </Text>
          </View>
        </View>
      </StyleView>
    );
  }
}

export default LinkScreen;

const styles = StyleSheet.create({
  card: {
    width: 'auto',
    height: 'auto',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  cardText: {
    height: 'auto',
    padding: 15,
  },
});
