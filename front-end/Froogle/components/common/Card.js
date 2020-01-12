import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import he from 'he';

import { GLOBAL_STYLES } from '../../constants/globalStyles';

/**
 * Class that renders the main answer card.
 */
class Card extends React.Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  render() {
    const { desc, url } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(url)}
        style={styles.card}
      >
        <Text style={[styles.cardText, GLOBAL_STYLES.bodyText1]}>
          {he.decode(desc)}
        </Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  cardText: {
    height: 'auto',
    padding: 15,
  },
});

export default Card;