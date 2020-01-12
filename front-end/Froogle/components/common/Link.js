import React from 'react';

import {Text, TouchableOpacity} from 'react-native';

class Link extends React.Component {
  render() {
    const {title, desc, url} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(url);
        }}>
        <Text>{title}</Text>
        <Text>{desc}</Text>
      </TouchableOpacity>
    );
  }
}

export default Link;
