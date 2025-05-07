import React from 'react';
import {TouchableOpacity, StyleSheet, View, Platform} from 'react-native';
import {Add} from '../../../assets';

const AddButton = ({onPress}) => {
  return (
    <View style={styles.shadowWrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}>
        <Add width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 60,
    borderRadius: 60,
    elevation: 6,
  },
  button: {
    backgroundColor: '#10266F',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // pastikan konten tidak keluar
  },
});

export default AddButton;
