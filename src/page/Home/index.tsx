import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Gap, Quotes, AddButton} from '../../components/atoms';
import {Header, Category, NotesList} from '../../components/molecules';
import {SearchIcon} from '../../assets';
import {getDatabase, ref, onValue} from 'firebase/database';
import {collection, onSnapshot, doc, updateDoc} from 'firebase/firestore';
import {firestore} from '../../config/Firebase';

const Home = ({uid, navigation}) => {
  const [fullName, setFullName] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}`);

    const unsubscribe = onValue(
      userRef,
      snapshot => {
        const data = snapshot.val();
        if (data && data.fullName) {
          setFullName(data.fullName);
        } else {
          console.log('Full name not found in Realtime Database.');
        }
      },
      error => {
        console.error('Error fetching user data: ', error);
      },
    );

    return () => unsubscribe();
  }, [uid]);

  const handleFavorite = async id => {
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (!noteToUpdate) {
        return;
      }

      const noteRef = doc(firestore, 'notes', id);
      await updateDoc(noteRef, {
        favorited: !noteToUpdate.favorited,
      });
      // Local state akan diupdate otomatis melalui onSnapshot
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const filteredNotes = notes.filter(note => {
    if (activeCategory === 'All') {
      return true;
    }
    if (activeCategory === 'Favorite') {
      return note.favorited === true;
    }
    return note.category === activeCategory;
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'notes'),
      snapshot => {
        const fetchedNotes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(fetchedNotes);
      },
      error => {
        console.error('Error fetching notes:', error);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Header
        title={`Welcome, ${fullName}`}
        titleSize={30}
        rightImage
        align="left"
      />
      <View style={styles.contentContainer}>
        <Quotes />
        <Gap height={22} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.searchFakeInput}
          activeOpacity={0.9}>
          <SearchIcon style={styles.icon} />
          <Text style={styles.placeholder}>Search</Text>
        </TouchableOpacity>
        <Gap height={22} />
        <Category
          activeCategory={activeCategory}
          setActiveCategory={category => {
            setActiveCategory(category);
          }}
        />
        <Gap height={19} />
        <NotesList
          notes={filteredNotes}
          onFavorite={handleFavorite}
          text={
            '\t\t\t\t\tNo notes available\nStart by creating your first one!'
          }
          onPressItem={note => navigation.navigate('EditNote', {note})}
        />
        <AddButton onPress={() => navigation.navigate('AddNote')} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 27,
  },
  searchFakeInput: {
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    gap: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#AEAEAE',
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: '#AEAEAE',
    fontFamily: 'Roboto-Medium',
    paddingVertical: 0,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
