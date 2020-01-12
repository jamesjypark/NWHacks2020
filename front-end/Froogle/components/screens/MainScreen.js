import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import froogleTextLogo from '../../assets/froogleTextLogo.png';
import { GLOBAL_STYLES } from '../../constants/globalStyles';
import { TEAL_COLOR } from '../../constants/hexcodes';

class MainScreen extends React.Component {
  static propTypes = {
    onChangeQuery: PropTypes.func.isRequired,
    submitQuery: PropTypes.func.isRequired
  }

  state = {
    loading: false,
  };

  render() {
    const { onChangeQuery, submitQuery } = this.props;
    const { loading } = this.state;
    return (
      <StyleView>
        <Image style={styles.mainScreenLogo} source={froogleTextLogo} />
        <Text style={[GLOBAL_STYLES.title, styles.mainScreenTitle]}>What can we help you with?</Text>
        <SearchBar
          isLarge
          onChangeQuery={onChangeQuery}
          submitQuery={submitQuery}
        />
        <ActivityIndicator
          style={styles.mainScreenLoader}
          animating={loading}
          color={TEAL_COLOR}
          size="large"
        />
      </StyleView>
    );
  }
}

const styles = StyleSheet.create({
  mainScreenLogo: {
    width: "auto",
    marginHorizontal: 80,
    marginTop: -20,
    marginBottom: 120,
    resizeMode: 'contain'
  },
  mainScreenTitle: {
    fontSize: 36,
    marginHorizontal: 15
  },
  mainScreenLoader: {
    marginTop: 75,
    transform: [{ scale: 1.75 }]
  }
});

export default MainScreen;
