import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {GLOBAL_STYLES} from '../../constants/globalStyles';

class Link extends React.Component {
  render() {
    const {title, desc, url} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(url);
        }}
        style={styles.card}>
        <View style={styles.cardText}>
          <Text style={GLOBAL_STYLES.bodyText2Bold}>{title}</Text>
          <Text style={GLOBAL_STYLES.bodyText2}>{desc}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Link;

const styles = StyleSheet.create({
  card: {
    width: 'auto',
    height: 'auto',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  cardText: {
    height: 'auto',
    padding: 15,
  },
});
