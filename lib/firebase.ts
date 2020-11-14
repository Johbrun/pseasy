import firebase from 'firebase';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId:process.env.FIREBASE_PROJECT_ID,
    storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
try {
    firebase.initializeApp(firebaseConfig);
    if (typeof window !== 'undefined')
    {
        firebase.analytics();
    }
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}


const firebaseWrapper = firebase;
export default firebaseWrapper;