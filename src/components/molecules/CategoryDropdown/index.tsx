import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {ButtonDrop} from '../../../assets';
import {categories} from '../Category';
const CategoryDropdown = ({
  selectedCategory,
  setModalVisible,
  modalVisible,
  handleSelect,
}) => (
  <>
    <TouchableOpacity
      style={styles.dropdown}
      onPress={() => setModalVisible(true)}>
      <View style={styles.dropdownContent}>
        <Text style={styles.dropdownText}>{selectedCategory}</Text>
        <ButtonDrop />
      </View>
    </TouchableOpacity>

    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.modalItem,
                index !== categories.length - 1 && styles.modalItemBorder,
              ]}
              onPress={() => handleSelect(item)}>
              <Text style={styles.modalItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  </>
);

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#1E80C9',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 28,
  },
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  dropdownText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#656565',
  },
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

export default CategoryDropdown;
