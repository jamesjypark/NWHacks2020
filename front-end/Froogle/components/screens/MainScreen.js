import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, StyleSheet } from 'react-native';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import froogleTextLogo from '../../assets/froogleTextLogo.png';
import { GLOBAL_STYLES } from '../../constants/globalStyles';

class MainScreen extends React.Component {

  static propTypes = {
    onChangeQuery: PropTypes.func.isRequired
  }

  state = {
    loading: false,
  };

  render() {
    const { onChangeQuery } = this.props;
    return (
      <StyleView>
        <Image style={styles.logo} source={froogleTextLogo} />
        <Text style={GLOBAL_STYLES.title}>What can we help you with?</Text>
        <SearchBar onChangeQuery={onChangeQuery} />
      </StyleView>
    );
  }
}

const styles = StyleSheet.create({
  "logo": {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }
});

export default MainScreen;
