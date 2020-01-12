import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, StyleSheet } from 'react-native';

import SearchBar from '../common/SearchBar';
import StyleView from '../common/StyleView';
import froogleTextLogo from '../../assets/froogleTextLogo.png';
import { GLOBAL_STYLES } from '../../constants/globalStyles';

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
    return (
      <StyleView>
        <Image style={styles.logo} source={froogleTextLogo} />
        <Text style={[GLOBAL_STYLES.title, styles.mainScreenTitle]}>What can we help you with?</Text>
        <SearchBar 
          isLarge 
          onChangeQuery={onChangeQuery} 
          submitQuery={submitQuery}  
        />
      </StyleView>
    );
  }
}

const styles = StyleSheet.create({
  "logo": {
    width: "auto",
    marginHorizontal: 80,
    marginTop: -20,
    marginBottom: 120,
    resizeMode: 'contain'
  },
  mainScreenTitle: {
    fontSize: 36,
    marginHorizontal: 15
  }
});

export default MainScreen;
