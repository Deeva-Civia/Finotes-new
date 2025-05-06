import React, {useState} from 'react';
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
import {auth} from './src/config/Firebase';
const Stack = createNativeStackNavigator();

const App = () => {
  const [notes, setNotes] = useState([]);

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
          {props => <AddNote {...props} notes={notes} setNotes={setNotes} />}
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
