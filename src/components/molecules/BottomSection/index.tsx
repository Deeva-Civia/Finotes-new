import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {AddPhoto} from '../../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button} from '../../atoms';

const BottomSection = ({onSavePress, onDeletePress, onImagePicked}) => {
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Gallery Permission',
          message: 'This app needs access to your photo gallery to pick images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to pick images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS permissions are handled in Info.plist
  };

  const handleImagePick = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access gallery without permission.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          onImagePicked?.(selectedImage);
        }
      },
    );
  };

  return (
    <View style={styles.bottomSection}>
      <View style={styles.buttonGroup}>
        <Button
          bgColor="#10266F"
          color="#FFFFFF"
          width={90}
          height={35}
          label="Save"
          borderColor="#10266F"
          size={15}
          onPress={onSavePress}
        />

        {onDeletePress && (
          <Button
            bgColor="#FF0000"
            color="#FFFFFF"
            width={90}
            height={35}
            label="Delete"
            borderColor="#FF0000"
            size={15}
            onPress={onDeletePress}
          />
        )}
      </View>

      <TouchableOpacity style={styles.imageUpload} onPress={handleImagePick}>
        <AddPhoto />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  imageUpload: {
    width: 50,
    height: 50,
    marginBottom: 30,
  },
});

export default BottomSection;
