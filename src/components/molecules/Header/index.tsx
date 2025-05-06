import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackLogo} from '../../../assets';
import ImageUser from '../../atoms/ImageUser';

const Header = ({
  title,
  titleSize = 26,
  displayBackButton = false,
  rightImage = false,
  align = 'left',
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {align === 'left' ? (
        <>
          {/* Kiri: Title */}
          <Text style={styles.title(titleSize)}>{title}</Text>

          {/* Kanan: Gambar user */}
          {rightImage && <ImageUser border width={70} height={70} />}
        </>
      ) : (
        <>
          {/* Kiri: Back */}
          {displayBackButton && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.backButton}
              onPress={onPress}>
              <BackLogo />
            </TouchableOpacity>
          )}

          {/* Kanan: Title */}
          <Text style={[styles.title(titleSize), {textAlign: 'right'}]}>
            {title}
          </Text>
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 22,
    elevation: 10,
  },
  title: titleSize => ({
    fontFamily: 'Roboto-Bold',
    fontSize: titleSize,
    color: '#10266F',
  }),
  backButton: {
    paddingRight: 10,
  },
});
