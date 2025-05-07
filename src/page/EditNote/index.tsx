import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
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
import {AddPhoto} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
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

const EditNote = ({navigation, route}) => {
  const {note} = route.params;
  const [selectedCategory, setSelectedCategory] = useState(note.category);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.body);
  const [photo, setPhoto] = useState(AddPhoto);
  const [photoBased64, setPhotoBased64] = useState('');

  const handleSelect = category => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const handleSave = async () => {
    const updatedNote = {
      title,
      body: description,
      category: selectedCategory,
      updatedAt: Date.now(),
      image: photoBased64, // Simpan base64
    };

    try {
      const noteRef = doc(firestore, 'notes', note.id);
      await updateDoc(noteRef, updatedNote);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating note: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      const noteRef = doc(firestore, 'notes', note.id);
      await deleteDoc(noteRef);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting note: ', error);
    }
  };

  const getImage = async () => {
    const result = await launchImageLibrary({
      maxHeight: 500,
      maxWidth: 500,
      quality: 0.5,
      includeBase64: true,
      mediaType: 'photo',
    });

    if (result.didCancel) {
      showMessage({
        message: 'Ups, sepertinya anda tidak memilih foto',
        type: 'danger',
      });
    } else {
      const assets = result.assets[0];
      const base64 = `data:${assets.type};base64,${assets.base64}`;
      setPhoto({uri: base64});
      setPhotoBased64(base64);
    }
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

          {photo && (
            <Image
              source={photo}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}
        </ScrollView>

        <TouchableOpacity style={styles.imagePicker} onPress={getImage}>
          <Image= source={photo}/>
        </TouchableOpacity>

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
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  imagePicker: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
