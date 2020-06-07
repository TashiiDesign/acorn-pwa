
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");



var firebaseConfig = {
    apiKey: "AIzaSyBvlPynAtHkKb3Iuwm-BWrWTAaFZYTE1J8",
    authDomain: "acorn-pwa.firebaseapp.com",
    databaseURL: "https://acorn-pwa.firebaseio.com",
    projectId: "acorn-pwa",
    storageBucket: "acorn-pwa.appspot.com",
    messagingSenderId: "906921723372",
    appId: "1:906921723372:web:4c127ad0065f1a69bcacc9",
    measurementId: "G-03WQGZS8DN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore()
  

  db.enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully
  
export default db