import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyACWTuI1qGqJWOAevM1fYwXtJiKili0shI",
  authDomain: "messanger-bypriya.firebaseapp.com",
  databaseURL: "https://messanger-bypriya.firebaseio.com",
  projectId: "messanger-bypriya",
  storageBucket: "messanger-bypriya.appspot.com",
  messagingSenderId: "869008202338",
  appId: "1:869008202338:web:386d8532add265d9cc4f3b",
  measurementId: "G-B8Z9J2LER7"
  });

  const db = firebaseApp.firestore();
  
  export default db;