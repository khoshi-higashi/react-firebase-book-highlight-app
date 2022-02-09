import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxi-dQRbgKNsZ50-s7Yh3VCjvFr0Z1IDQ",
  authDomain: "react-firebase-todo-app-d287a.firebaseapp.com",
  projectId: "react-firebase-todo-app-d287a",
  storageBucket: "react-firebase-todo-app-d287a.appspot.com",
  messagingSenderId: "706384798125",
  appId: "1:706384798125:web:01cb6b2b877b23c1c84124",
  measurementId: "G-6F5590DB1S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
