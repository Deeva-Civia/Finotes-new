import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const NoteBodyInput = ({value, onChangeText}) => (
  <TextInput
    style={styles.noteInput}
    placeholder="Start typing"
    placeholderTextColor="#B4B4B4"
    multiline
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  noteInput: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: '#656565',
  },
});

export default NoteBodyInput;
