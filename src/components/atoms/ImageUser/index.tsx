import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {UserImage} from '../../../assets';

const ImageUser = ({width = 150, height = 150, border = false}) => {
  return (
    <View style={[styles.outerWrapper, border && styles.border]}>
      <View style={styles.imageWrapper(width, height)}>
        <Image source={UserImage} style={styles.image} />
      </View>
    </View>
  );
};

export default ImageUser;

const styles = StyleSheet.create({
  outerWrapper: {
    borderRadius: 100,
  },
  border: {
    borderWidth: 2,
    borderColor: '#10266F',
    borderStyle: 'solid',
    borderRadius: 100,
  },
  imageWrapper: (width, height) => ({
    width: width,
    height: height,
    borderRadius: 100,
    overflow: 'hidden',
  }),
  image: {
    width: '100%',
    height: '100%',
  },
});
