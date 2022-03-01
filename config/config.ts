import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBhBprxVg4g39-2FE4a_bXWgOlVlFG6L8E",

    authDomain: "watchnativeapp.firebaseapp.com",
  
    projectId: "watchnativeapp",
  
    storageBucket: "watchnativeapp.appspot.com",
  
    messagingSenderId: "652832379624",
  
    appId: "1:652832379624:web:e5f514a48b1400c7152f5d"  
}

firebase.initializeApp(firebaseConfig);