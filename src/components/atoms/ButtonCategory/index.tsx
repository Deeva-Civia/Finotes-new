import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {StarFilled, StarFilledWhite} from '../../../assets';

const ButtonCategory = ({label, isActive = false, onPress}) => {
  return (
    <View style={[styles.shadowWrapper, {elevation: isActive ? 0 : 4}]}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: isActive ? '#1E80C9' : '#FFFFFF'},
        ]}
        onPress={onPress}
        activeOpacity={0.7}>
        <View style={styles.content}>
          {label === 'Favorite' &&
            (isActive ? (
              <StarFilledWhite width={15} height={15} />
            ) : (
              <StarFilled width={15} height={15} />
            ))}
          <Text
            style={[
              styles.text,
              {color: isActive ? '#FFFFFF' : '#656565'},
              {fontFamily: isActive ? 'Roboto-Medium' : 'Roboto-Regular'},
            ]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCategory;

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
    marginBottom: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});
