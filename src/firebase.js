

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzhoFPzrL2gfxjTG4m9cTHBV0SzRmzWK4",
  authDomain: "universidad-86785.firebaseapp.com",
  projectId: "universidad-86785",
  storageBucket: "universidad-86785.appspot.com",
  messagingSenderId: "38526993417",
  appId: "1:38526993417:web:83332c0f874b227fb964d8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);


export { firestore, app };