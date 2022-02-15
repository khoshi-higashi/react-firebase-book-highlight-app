import "./App.css";
import React, { useEffect, useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import Book from "./Book";
import Main from "./Main";
import Login from "./Login";
import Form from "./Form";
import { db, auth, provider } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const booksCollectionRef = collection(db, "books");
  const [selectedItem, setSelectedItem] = useState(0);

  const items = (
    <ul className="books">
      {books.map((book) => (
        <Book
          book={book}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      ))}
    </ul>
  );

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This code here... fires when the app.js loads
    onSnapshot(
      query(booksCollectionRef, orderBy("timestamp", "desc")),
      (snapshot) => {
        setBooks(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }
    );
  }, []);

  const addBook = (event) => {
    event.preventDefault(); // will stop the REFRESH
    addDoc(collection(db, "books"), {
      title: inputTitle,
      author: inputAuthor,
      body: inputBody,
      timestamp: serverTimestamp(),
      user: user.displayName,
    });
    setInputBody(""); // clear up the input after clicking add todo button
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user has logged in...
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      // person some cleanup actions
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="App">
      <h1>Book highlight submission site 📚</h1>
      <div className="app__header">
        <Login />
      </div>

      {user ? (
        <>
          <Form user={user} />
          <Main selectedItem={selectedItem} />
          <>{items}</>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
