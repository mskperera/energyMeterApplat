import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import 'firebase/database';

    // Initialize Firebase with your project configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBybcV1PbUAd15eyEyTaIo2CwY0wa9lvN8",
        authDomain: "smart-energy-meter-50344.firebaseapp.com",
        databaseURL: "https://smart-energy-meter-50344-default-rtdb.firebaseio.com",
        projectId: "smart-energy-meter-50344",
        storageBucket: "smart-energy-meter-50344.appspot.com",
        messagingSenderId: "4574711061",
        appId: "1:4574711061:web:103615b3c81c4fbceaed1c",
        measurementId: "G-BMQ11D59CD"
      };
  
     // if (!firebase.apps.length) {
    export const FIREBASE_APP=initializeApp(firebaseConfig);
    export const FIREBASE_AUTH=getAuth(FIREBASE_APP);
