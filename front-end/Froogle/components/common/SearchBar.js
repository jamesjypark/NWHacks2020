import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

class SearchBar extends React.Component {
  
  static propTypes = {
    onChangeQuery: PropTypes.func.isRequired
  }

  render() {
    return (
      <View>
        <Text>SearchBar</Text>
      </View>
    );
  }
}

export default SearchBar;
