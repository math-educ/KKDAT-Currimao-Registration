// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7fwws_eqnqfhrEBB0a_NvsyrRt4k_XWc",
  authDomain: "kkdat-registration.firebaseapp.com",
  projectId: "kkdat-registration",
  storageBucket: "kkdat-registration.firebasestorage.app",
  messagingSenderId: "813243358198",
  appId: "1:813243358198:web:0a43d51586f21a51bc05d7",
  measurementId: "G-X7V1FZ9NGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
