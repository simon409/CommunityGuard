import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCu0Ijc-fVbb5SAk3eIcs07axf8r6ljH5s",
  authDomain: "communityguard-583fc.firebaseapp.com",
  databaseURL: "https://communityguard-583fc-default-rtdb.firebaseio.com",
  projectId: "communityguard-583fc",
  storageBucket: "communityguard-583fc.appspot.com",
  messagingSenderId: "1068169364444",
  appId: "1:1068169364444:web:bdbb5f56afec1545d14519",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };
