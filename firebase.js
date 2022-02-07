// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxi-dQRbgKNsZ50-s7Yh3VCjvFr0Z1IDQ",
  authDomain: "react-firebase-todo-app-d287a.firebaseapp.com",
  projectId: "react-firebase-todo-app-d287a",
  storageBucket: "react-firebase-todo-app-d287a.appspot.com",
  messagingSenderId: "706384798125",
  appId: "1:706384798125:web:01cb6b2b877b23c1c84124",
  measurementId: "G-6F5590DB1S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
