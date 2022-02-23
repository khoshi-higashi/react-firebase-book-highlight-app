import "./css/App.css";
import React, { useEffect, useState } from "react";
import Book from "./components/Book";
import Main from "./components/Main";
import Login from "./components/Login";
import Form from "./components/Form";
import Search from "./components/Search";
import TitleSelect from "./components/TitleSelect";
import { db, auth } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import FlipMove from "react-flip-move";

function App() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Book Highlight 📚</h1>
      <div className="app__header">
        <Login user={user} />
      </div>

      {user ? (
        <>
          {user.displayName ? <Form user={user} /> : <></>}
          <Search user={user} />
          <TitleSelect
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            booksCollectionRef={booksCollectionRef}
          />
          {selectedItem !== "" ? (
            <>
              <p>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedItem("");
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Reset
                </Button>
              </p>
              <Main selectedItem={selectedItem} user={user} />
            </>
          ) : (
            <></>
          )}
          <FlipMove className="books">
            {books.map((book) => (
              <Book
                key={book.id}
                user={user}
                book={book}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            ))}
          </FlipMove>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
