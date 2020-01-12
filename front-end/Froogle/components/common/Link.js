import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import he from 'he';

import { GLOBAL_STYLES } from '../../constants/globalStyles';
import { GREY_COLOR } from '../../constants/hexcodes';

/**
 * Class that renders a link card to a 
 * secondary result.
 */
class Link extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }
  
  render() {
    const { title, desc, url } = this.props;

    return (
      <TouchableNativeFeedback
        onPress={() => this.props.onPress(url)}
        style={styles.card}
      >
        <View style={styles.cardText}>
          <Text style={GLOBAL_STYLES.bodyText2Bold}>{he.decode(title)}</Text>
          <Text style={GLOBAL_STYLES.bodyText2}>{he.decode(desc)}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 'auto',
    height: 'auto',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GREY_COLOR,
  },
  cardText: {
    height: 'auto',
    padding: 15,
  },
});

export default Link;