import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React, {useState} from 'react';

const TextInput = ({label, placeholder, secureTextEntry = false, ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Input
          placeholder={placeholder}
          placeholderTextColor="#8D92A3"
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            {borderColor: isFocused ? '#10266F' : '#FFFFFF'},
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#10266F',
    marginBottom: 8,
  },
  container: {
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // untuk Android
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#020202',
  },
});
