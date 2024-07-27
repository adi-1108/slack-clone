// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4xbjGAdu4OejyiWG1Cyi6Ssf_3mxTh_E",
  authDomain: "slack-clone-2ea54.firebaseapp.com",
  projectId: "slack-clone-2ea54",
  storageBucket: "slack-clone-2ea54.appspot.com",
  messagingSenderId: "233696261872",
  appId: "1:233696261872:web:fdd052a79cd88f844ef435",
  measurementId: "G-CFC3XS8GM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
