import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {GLOBAL_STYLES} from '../../constants/globalStyles';

class Card extends React.Component {
  render() {
    const {desc, url} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(url);
        }}
        style={styles.card}>
        <Text style={{...styles.cardText, ...GLOBAL_STYLES.bodyText1}}>
          {desc}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Card;

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
