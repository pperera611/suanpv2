
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMiJs9kmUGPsYSNeSOgSs5iYkJ16kVqeI",
  authDomain: "suanp-f6399.firebaseapp.com",
  databaseURL: "https://suanp-f6399-default-rtdb.firebaseio.com",
  projectId: "suanp-f6399",
  storageBucket: "suanp-f6399.appspot.com",
  messagingSenderId: "684576711413",
  appId: "1:684576711413:web:3e819596efa49b542f5bbc"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { auth, firestore };
