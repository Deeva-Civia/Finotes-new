import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
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

const EditNote = ({navigation}) => {
  const route = useRoute();
  const {note} = route.params;

  const [selectedCategory, setSelectedCategory] = useState(note.category);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.body);
  const [image, setImage] = useState(null); 

  const handleSelect = category => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const handleImagePicked = (selectedImage) => {
    setImage(selectedImage.uri); 
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
          <NoteDateText date="18 April 2025 18:16" />
          <CategoryDropdown
            selectedCategory={selectedCategory}
            handleSelect={handleSelect}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <NoteBodyInput value={description} onChangeText={setDescription} />

          {image && (
            <Image
              source={{uri: image}}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}
        </ScrollView>

        <BottomSection
          onSavePress={() => navigation.navigate('Home')}
          onDeletePress={() => navigation.navigate('Home')}
          onImagePicked={handleImagePicked} 
        />
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
    height: 400,
    marginTop: 10,
    borderRadius: 10,
  },
});
