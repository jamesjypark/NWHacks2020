import React from 'react';
import { View, StyleSheet } from 'react-native';

class StyleView extends React.Component {
  state = {};
  render() {
    return (
      <View style={styles.view}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  "view": {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 25,
    paddingVertical: 40
  }
});

export default StyleView;
