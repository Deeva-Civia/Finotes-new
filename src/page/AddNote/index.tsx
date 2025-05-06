import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  BottomSection,
  CategoryDropdown,
  Header,
} from '../../components/molecules';
import {
  NoteBodyInput,
  NoteDateText,
  NoteTitleInput,
} from '../../components/atoms';
import {CategoryModal} from '../../components/molecules';
import {collection, addDoc} from 'firebase/firestore';
import {firestore} from '../../config/Firebase';

const formatDateTime = timestamp => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${formattedDate} | ${formattedTime}`;
};

const AddNote = ({navigation, notes, setNotes, refreshNotes}) => {
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleSave = async () => {
    const timestamp = Date.now();
    const newNote = {
      title,
      body: note,
      category: selectedCategory,
      createdAt: timestamp,
      updatedAt: timestamp,
      favorited: false,
    };

    try {
      await addDoc(collection(firestore, 'notes'), newNote);
      await refreshNotes();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSelect = category => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <View style={styles.page}>
      <Header
        title="Add Note"
        titleSize={26}
        displayBackButton
        align="right"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <NoteTitleInput value={title} onChangeText={setTitle} />
          <NoteDateText date={formatDateTime(Date.now())} />
          <CategoryDropdown
            selectedCategory={selectedCategory}
            handleSelect={handleSelect}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <NoteBodyInput value={note} onChangeText={setNote} />
        </ScrollView>

        <BottomSection onSavePress={handleSave} />
      </View>
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  titleInput: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
  date: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    color: '#656565',
    marginTop: 6,
    marginBottom: 16,
  },
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
  noteInput: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 10,
    position: 'relative',
    marginBottom: 15,
    marginHorizontal: 10,
  },
  imageUpload: {
    width: 45,
    height: 45,
    marginBottom: 30,
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
