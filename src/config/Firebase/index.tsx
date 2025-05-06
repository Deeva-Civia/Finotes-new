// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDygSEz7Y9bF_q-YN5UTEgjtqtu3etCHUE',
  authDomain: 'finotes-b9afb.firebaseapp.com',
  projectId: 'finotes-b9afb',
  storageBucket: 'finotes-b9afb.appspot.com',
  messagingSenderId: '713174989656',
  appId: '1:713174989656:web:c431f2e0926a8a769b832d',
  databaseURL: 'https://finotes-b9afb-default-rtdb.firebaseio.com/',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {app};
