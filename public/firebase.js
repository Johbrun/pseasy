/* eslint-disable no-undef */
import firebase from 'firebase';

console.log('load firebase');

const firebaseConfig = {
    apiKey: 'AIzaSyBDjvBVMLUXZ1f00l6FhmH8zNx3Pm0Fvo8',
    authDomain: 'pseasy-fr.firebaseapp.com',
    databaseURL: 'https://pseasy-fr.firebaseio.com',
    projectId: 'pseasy-fr',
    storageBucket: 'pseasy-fr.appspot.com',
    messagingSenderId: '766220552342',
    appId: '1:766220552342:web:5e1b2c7ac02e8d68995ab7',
    measurementId: 'G-2WV98V08ES'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();