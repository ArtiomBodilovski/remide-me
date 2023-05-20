// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6jzGAHFitxBNhapoCOh_oSVuZRlRh8d8",
  authDomain: "remind-me-bca79.firebaseapp.com",
  projectId: "remind-me-bca79",
  storageBucket: "remind-me-bca79.appspot.com",
  messagingSenderId: "913205468822",
  appId: "1:913205468822:web:709b813476d40453c2ecb7"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };