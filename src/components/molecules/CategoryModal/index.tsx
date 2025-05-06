import React from 'react';
import {Modal, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {categories} from '../Category';

const CategoryModal = ({visible, onClose, onSelect}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={0.8}>
        <View style={styles.modalContent}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.modalItem,
                index !== categories.length - 1 && styles.modalItemBorder,
              ]}
              onPress={() => onSelect(item)}>
              <Text style={styles.modalItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: 200,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    textAlign: 'center',
  },
  modalItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
