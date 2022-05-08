/* globals window */
import firebase from 'firebase'
let initialized = false;

const initB = () => {
  if (initialized) return;
  firebase.initializeApp({
    
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    
    storageBucket: "aaaa.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
  })  
  initialized  = true;  
}

export default initB
