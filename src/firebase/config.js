import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC7uHGmj-B6cHaY3sAVQlgWb-xWd0cZhng",
    authDomain: "messenger-clone-52fb5.firebaseapp.com",
    projectId: "messenger-clone-52fb5",
    storageBucket: "messenger-clone-52fb5.appspot.com",
    messagingSenderId: "642789035763",
    appId: "1:642789035763:web:89706351171bd752323186",
    measurementId: "G-NHKNFTWPF8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const db = firebase.firestore()

  // // Use emulators
  if(window.location.hostname === 'localhost'){
    auth.useEmulator('http://localhost:9099')
    db.useEmulator('localhost','8080')
  }
  
  
  export {db, auth}
  export default firebase;