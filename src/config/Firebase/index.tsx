import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBrskmndagAvXLZe5nGivZM5i1GIECPiZA",
  authDomain: "finotes-12638.firebaseapp.com",
  databaseURL: "https://finotes-12638-default-rtdb.firebaseio.com",
  projectId: "finotes-12638",
  storageBucket: "finotes-12638.appspot.com",
  messagingSenderId: "919846671526",
  appId: "1:919846671526:web:3692f7016fec8956229067"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };