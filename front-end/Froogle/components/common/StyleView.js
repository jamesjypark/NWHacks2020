import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Class that renders the main UI box to keep
 * styles consistent throughout the application.
 */
class StyleView extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }
  
  render() {
    return (
      <View style={styles.view}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 25,
    paddingVertical: 40
  }
});

export default StyleView;