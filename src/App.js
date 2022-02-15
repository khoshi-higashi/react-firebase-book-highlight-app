import "./App.css";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import Main from "./Main";
import Login from "./Login";
import Form from "./Form";
import { db, auth } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "books"), orderBy("timestamp", "desc")),
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
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
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
          <Main selectedItem={selectedItem} user={user} />
          <ul className="books">
            {books.map((book) => (
              <Book
                user={user}
                book={book}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
             ))} 
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
