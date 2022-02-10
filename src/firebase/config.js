// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbVjbFDI7acgCHAr7EiSTSeP8MFkHKeRU",
  authDomain: "prodevelopergram.firebaseapp.com",
  projectId: "prodevelopergram",
  storageBucket: "prodevelopergram.appspot.com",
  messagingSenderId: "331504241510",
  appId: "1:331504241510:web:fb43b16a1fb2ced5add6a7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
