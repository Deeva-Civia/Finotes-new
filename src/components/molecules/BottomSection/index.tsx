import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {AddPhoto} from '../../../assets';
import {Button} from '../../atoms';

const BottomSection = ({onSavePress, onDeletePress}) => (
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

    <TouchableOpacity style={styles.imageUpload}>
      <AddPhoto />
    </TouchableOpacity>
  </View>
);

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
