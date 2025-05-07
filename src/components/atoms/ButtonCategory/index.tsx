import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import React from 'react';
import {StarFilled, StarFilledWhite} from '../../../assets';

const ButtonCategory = ({label, isActive = false, onPress}) => {
  const renderIcon = () => {
    if (label === 'Favorite') {
      return isActive ? (
        <StarFilledWhite width={15} height={15} />
      ) : (
        <StarFilled width={15} height={15} />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isActive ? '#1E80C9' : '#FFFFFF',
          elevation: isActive ? 0 : 3,
          shadowOpacity: isActive ? 0 : 0.1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.content}>
        {renderIcon()}
        <Text
          style={[
            styles.text,
            {
              color: isActive ? '#FFFFFF' : '#656565',
              fontFamily: isActive ? 'Roboto-Medium' : 'Roboto-Regular',
            },
          ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCategory;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    marginRight: 6,
    marginBottom: 2,
    paddingVertical: 8,
    paddingHorizontal: 13,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 15,
  },
});
