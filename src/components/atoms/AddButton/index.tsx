import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Add} from '../../../assets';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}>
      <Add width={20} height={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 60,
    backgroundColor: '#10266F',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default AddButton;
