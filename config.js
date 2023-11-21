import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apikey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  databaseURL: process.env.EXPO_PUBLIC_databaseURL,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };
