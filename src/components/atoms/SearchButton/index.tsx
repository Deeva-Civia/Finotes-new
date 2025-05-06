import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {SearchIcon} from '../../../assets';

const SearchButton = ({searchQuery, setSearchQuery}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {borderColor: isFocused ? '#10266F' : '#AEAEAE'},
      ]}>
      <SearchIcon style={styles.icon} />
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
        placeholderTextColor="#AEAEAE"
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    alignItems: 'center',
    width: 325,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#AEAEAE',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    paddingVertical: 0,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
