import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

import froogleLogo from '../../assets/froogleLogo.png';
import searchIcon from '../../assets/searchIcon.png';
import { TEAL_COLOR } from '../../constants/hexcodes';

/**
 * Class that renders the searchbar used for
 * submitting queries to the backend.
 */
class SearchBar extends React.Component {
  static propTypes = {
    onChangeQuery: PropTypes.func.isRequired,
    submitQuery: PropTypes.func.isRequired,
    goToMainScreen: PropTypes.func,
    isLarge: PropTypes.bool,
  };

  /**
   * Method that renders a small searchbar with the application
   * logo.
   * 
   * @param {function} onChangeQuery
   * @param {function} submitQuery
   * @param {function} goToMainScreen
   * @returns {JSX.Element} Returns the searchbar UI.
   */
  renderSearchBar = (onChangeQuery, submitQuery, currQuery, goToMainScreen) => (
    <View style={styles.searchBar}>
      <TouchableNativeFeedback onPress={goToMainScreen}>
        <Image style={styles.searchBarLogo} source={froogleLogo} />
      </TouchableNativeFeedback>
      <TextInput
        style={styles.searchBarInput}
        onChangeText={onChangeQuery}
        onSubmitEditing={submitQuery}
        defaultValue={currQuery}
      />
      <TouchableNativeFeedback onPress={submitQuery}>
        <Image style={styles.searchBarIcon} source={searchIcon} />
      </TouchableNativeFeedback>
    </View>
  );

  /**
   * Method that renders a full-width searchbar 
   * without the application logo.
   * 
   * @param {function} onChangeQuery
   * @param {function} submitQuery
   * @returns {JSX.Element} Returns the searchbar UI.
   */
  renderLargeSearchBar = (onChangeQuery, submitQuery, currQuery) => (
    <View style={styles.searchBar}>
      <TextInput
        style={[styles.searchBarInput, styles.searchBarInputLarge]}
        onChangeText={onChangeQuery}
        onSubmitEditing={submitQuery}
        defaultValue={currQuery}
      />
      <TouchableNativeFeedback onPress={submitQuery}>
        <Image
          style={[styles.searchBarIcon, styles.searchBarIconLarge]}
          source={searchIcon}
        />
      </TouchableNativeFeedback>
    </View>
  );

  render() {
    const { isLarge, onChangeQuery, submitQuery, currQuery, goToMainScreen } = this.props;

    return isLarge
      ? this.renderLargeSearchBar(onChangeQuery, submitQuery, currQuery)
      : this.renderSearchBar(onChangeQuery, submitQuery, currQuery, goToMainScreen);
  }
}

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  searchBarLogo: {
    width: 30,
    height: 40,
    marginLeft: -5,
    marginRight: 10,
    resizeMode: 'contain',
  },
  searchBarInput: {
    width: '90%',
    height: 40,
    paddingLeft: 15,
    paddingRight: 45,
    borderWidth: 2,
    borderColor: TEAL_COLOR,
    borderRadius: 100,
  },
  searchBarInputLarge: {
    width: '100%',
    marginTop: 25,
  },
  searchBarIcon: {
    width: 30,
    height: 40,
    marginLeft: -38,
    resizeMode: 'contain',
  },
  searchBarIconLarge: {
    width: 30,
    marginLeft: -38,
    marginTop: 25,
    resizeMode: 'contain',
  },
});

export default SearchBar;