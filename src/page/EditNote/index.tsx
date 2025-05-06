import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  BottomSection,
  CategoryDropdown,
  Header,
  CategoryModal,
} from '../../components/molecules';
import {
  NoteBodyInput,
  NoteDateText,
  NoteTitleInput,
} from '../../components/atoms';

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

const EditNote = ({navigation, route, notes, setNotes}) => {
  const {note} = route.params;

  const [selectedCategory, setSelectedCategory] = useState(note.category);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.body);

  const handleSelect = category => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const handleSave = () => {
    const updatedNotes = notes.map(n =>
      n.id === note.id
        ? {
            ...n,
            title,
            body: description,
            category: selectedCategory,
            updatedAt: Date.now(),
          }
        : n,
    );
    setNotes(updatedNotes);
    navigation.navigate('Home');
  };

  const handleDelete = () => {
    const filteredNotes = notes.filter(n => n.id !== note.id);
    setNotes(filteredNotes);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.page}>
      <Header
        title="Edit Note"
        titleSize={26}
        displayBackButton
        align="right"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <NoteTitleInput value={title} onChangeText={setTitle} />
          <NoteDateText
            date={formatDateTime(note.updatedAt || note.createdAt)}
          />

          <CategoryDropdown
            selectedCategory={selectedCategory}
            handleSelect={handleSelect}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <NoteBodyInput value={description} onChangeText={setDescription} />
        </ScrollView>

        <BottomSection onSavePress={handleSave} onDeletePress={handleDelete} />
      </View>

      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default EditNote;

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
});
