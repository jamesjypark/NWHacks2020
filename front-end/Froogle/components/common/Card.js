import React from 'react';

import {Text, TouchableOpacity, Alert} from 'react-native';

class Card extends React.Component {
  render() {
    const {desc, url} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(url);
        }}>
        <Text>{desc}</Text>
      </TouchableOpacity>
    );
  }
}

export default Card;
