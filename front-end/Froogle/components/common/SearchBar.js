import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import froogleLogo from '../../assets/froogleLogo.png';
import searchIcon from '../../assets/searchIcon.png';
import { TEAL_COLOR } from '../../constants/hexcodes';

class SearchBar extends React.Component {

  static propTypes = {
    isLarge: PropTypes.bool,
    onChangeQuery: PropTypes.func.isRequired,
    submitQuery: PropTypes.func.isRequired,
  }

  renderSearchBar = (onChangeQuery, submitQuery) => (
    <View style={styles.searchBar}>
      <Image style={styles.searchBarLogo} source={froogleLogo} />
      <TextInput
        style={styles.searchBarInput}
        onChangeText={onChangeQuery}
        onSubmitEditing={submitQuery}
      />
      {/* TODO: Fix search button */}
      <TouchableOpacity activeOpacity={0.5} onPress={this.test}>
        <Image style={styles.searchBarIcon} source={searchIcon} />
      </TouchableOpacity>
    </View>
  );

  renderLargeSearchBar = (onChangeQuery, submitQuery) => (
    <View style={styles.searchBar}>
      <TextInput
        style={[styles.searchBarInput, styles.searchBarInputLarge]}
        onChangeText={onChangeQuery}
        onSubmitEditing={submitQuery}
      />
      {/* TODO: Fix search button */}
      <TouchableOpacity activeOpacity={0.5} onPress={this.test}>
        <Image style={[styles.searchBarIcon, styles.searchBarIconLarge]} source={searchIcon} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { isLarge, onChangeQuery, submitQuery } = this.props;

    return isLarge
      ? this.renderLargeSearchBar(onChangeQuery, submitQuery)
      : this.renderSearchBar(onChangeQuery, submitQuery)
  }
}

const styles = StyleSheet.create({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10
  },
  searchBarLogo: {
    width: 30,
    height: 40,
    marginLeft: -5,
    marginRight: 10,
    resizeMode: "contain"
  },
  searchBarInput: {
    width: "90%",
    height: 40,
    paddingLeft: 15,
    paddingRight: 45,
    borderWidth: 2,
    borderColor: TEAL_COLOR,
    borderRadius: 100
  },
  searchBarInputLarge: {
    width: "100%",
    marginTop: 25
  },
  searchBarIcon: {
    width: 30,
    height: 40,
    marginLeft: -38,
    resizeMode: "contain"
  },
  searchBarIconLarge: {
    width: 30,
    marginLeft: -38,
    marginTop: 25,
    resizeMode: "contain"
  }
});

export default SearchBar;
