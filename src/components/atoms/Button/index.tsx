import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = ({
  label,
  color = '#FFFFFF',
  bgColor = '#10266F',
  width = 361,
  height = 45,
  borderColor = '#10266F',
  onPress = () => {}, // default fallback agar tidak error
  size = 20,
}) => {
  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress(); // panggil fungsi dari luar (misalnya onSubmit)
    }
  };

  return (
    <TouchableOpacity
      style={styles.button(bgColor, width, height, borderColor)}
      activeOpacity={0.7}
      onPress={handlePress}
    >
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
    width,
    height,
    backgroundColor: bgColor,
    borderWidth: 1,
    borderColor,
    borderRadius: 100,
  }),
  text: (color, size) => ({
    fontFamily: 'Poppins-SemiBold',
    fontSize: size,
    fontWeight: '600', // diperbaiki
    color,
  }),
});
