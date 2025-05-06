import React, {useState, useEffect} from 'react';
import SplashScreen from './src/page/SplashScreen';
import SignIn from './src/page/SignIn';
import SignUp from './src/page/SignUp';
import Start from './src/page/Start';
import Home from './src/page/Home';
import Search from './src/page/Search';
import AddNote from './src/page/AddNote';
import EditNote from './src/page/EditNote';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import './src/config/Firebase';
import {collection, getDocs} from 'firebase/firestore';
import {auth, firestore} from './src/config/Firebase';
const Stack = createNativeStackNavigator();

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Rekonfigurasi URL',
      body: 'Menggunakan file htaccess : sudah tidak pakai index.html',
      createdAt: new Date('2025-04-15').getTime(),
      favorited: false,
      category: 'Back-end',
    },
    {
      id: '2',
      title: 'Error Handling',
      body: 'Untuk menangani error dalam javascript menggunakan try',
      createdAt: new Date('2025-04-14').getTime(),
      updatedAt: new Date('2025-04-15').getTime(),
      favorited: true,
      category: 'Front-end',
    },
    {
      id: '3',
      title: 'IP & Domain',
      body: 'IP : 192.168.1.0',
      createdAt: new Date('2025-04-12').getTime(),
      updatedAt: new Date('2025-04-15').getTime(),
      favorited: false,
      category: 'Back-end',
    },
    {
      id: '4',
      title: 'Port',
      body: 'Port 22 : SSH',
      createdAt: new Date('2025-04-09').getTime(),
      updatedAt: new Date('2025-04-15').getTime(),
      favorited: true,
      category: 'Back-end',
    },
  ]);

  const fetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'notes'));
      const fetchedNotes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const handleFavorite = id => {
    const updatedNotes = notes.map(note =>
      note.id === id ? {...note, favorited: !note.favorited} : note,
    );
    setNotes(updatedNotes);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => (
            <Home
              {...props}
              uid={auth.currentUser?.uid}
              notes={notes}
              onFavorite={handleFavorite}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddNote" options={{headerShown: false}}>
          {props => (
            <AddNote
              {...props}
              notes={notes}
              setNotes={setNotes}
              refreshNotes={fetchNotes}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditNote" options={{headerShown: false}}>
          {props => <EditNote {...props} notes={notes} setNotes={setNotes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Search"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}>
          {props => (
            <Search
              {...props}
              notes={notes}
              onFavorite={handleFavorite}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
