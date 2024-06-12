// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  appId: "1:233696261872:web:c48fb97fb5c27d7f4ef435",
  measurementId: "G-M160YR83Z8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
