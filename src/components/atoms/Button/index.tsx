import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({
  label,
  color,
  bgColor,
  width = 361,
  height = 45,
  borderColor,
  onPress,
  size = 20,
}) => {
  return (
    <TouchableOpacity
      style={styles.button(bgColor, width, height, borderColor)}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={styles.text(color, size)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: (bgColor, width, height, borderColor) => ({
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: width,
    height: height,
    backgroundColor: bgColor,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 100,
  }),
  text: (color, size) => ({
    fontFamily: 'Poppins-SemiBold',
    fontSize: size,
    fontWeight: 'semibold',
    color: color,
  }),
});
