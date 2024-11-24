import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA90NkbnXsZVaFGF-63ci_EWV7WKJyNKgc",
    authDomain: "prog3-jvp.firebaseapp.com",
    projectId: "prog3-jvp",
    storageBucket: "prog3-jvp.firebasestorage.app",
    messagingSenderId: "747901566719",
    appId: "1:747901566719:web:5a7c171201b7c1935e56ca",
    measurementId: "G-1Q6827D2X6"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()
export const storage = app.storage()
