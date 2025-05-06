import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const NoteTitleInput = ({value, onChangeText}) => (
  <TextInput
    style={styles.titleInput}
    placeholder="Title"
    placeholderTextColor="#B4B4B4"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  titleInput: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
});

export default NoteTitleInput;
