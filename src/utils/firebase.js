import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdKyJqA6zjyxMn7S1MdLUnDBpJALZIiEA",
  authDomain: "clone-3afbe.firebaseapp.com",
  databaseURL: "https://clone-3afbe-default-rtdb.firebaseio.com",
  projectId: "clone-3afbe",
  storageBucket: "clone-3afbe.appspot.com",
  messagingSenderId: "551043670928",
  appId: "1:551043670928:web:1c344ff063da0207ab0915",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
