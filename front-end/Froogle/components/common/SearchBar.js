import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import searchIcon from '../../assets/searchIcon.png';
import { TEAL_COLOR } from '../../constants/hexcodes';

class SearchBar extends React.Component {

  static propTypes = {
    isLarge: PropTypes.bool,
    onChangeQuery: PropTypes.func.isRequired,
    submitQuery: PropTypes.func.isRequired,
  }

  render() {
    const { isLarge, onChangeQuery, submitQuery } = this.props;
    const textInputStyles = isLarge
      ? [styles.searchBarInput, styles.searchBarInputLarge]
      : styles.searchBarInput;

    return (
      <View style={styles.searchBar}>
        <TextInput style={textInputStyles} onChangeText={onChangeQuery} onSubmitEditing={submitQuery}/>
        <TouchableOpacity activeOpacity={0.5} onPress={this.test}>
          <Image style={styles.searchBarIcon} source={searchIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10
  },
  searchBarInput: {
    width: "100%",
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
    marginLeft: -38,
    marginTop: 9,
    resizeMode: "contain"
  }
});

export default SearchBar;
