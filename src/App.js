import "./css/App.css";
import React, { useEffect, useState } from "react";
import Book from "./components/Book";
import Main from "./components/Main";
import Login from "./components/Login";
import Form from "./components/Form";
import Search from "./components/Search";
import TitleSelect from "./components/TitleSelect";
import { db, auth } from "./firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import FlipMove from "react-flip-move";

function App() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [open, setOpen] = useState(false);
  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    onSnapshot(
      query(booksCollectionRef, orderBy("timestamp", "desc"), limit(15)),
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

  const toggle = () => setOpen(!open);

  const clear = (event) => {
    setSearchItem("");
    event.preventDefault();
  };

  return (
    <div className="App">
      <h1>Book Highlight 📚</h1>
      <div className="app__header">
        <Login user={user} />
      </div>

      {books.length === 0 ? (
        <p>現在読み取り上限に達し、閲覧することができません</p>
      ) : selectedItem === "" && searchItem === "" ? (
        <>
          <p>最新の{books.length}件を表示しています</p>
          <p>検索 or 書籍タイトル選択をご利用ください</p>
        </>
      ) : (
        <></>
      )}

      {user ? (
        <>
          {user.displayName && window.innerWidth < 480 ? (
            <>
              <Button className="form__button" onClick={toggle}>
                {open === false ? "追加する" : "閉じる"}
              </Button>
              {open ? (
                <Form
                  user={user}
                  selectedItem={selectedItem}
                  booksCollectionRef={booksCollectionRef}
                />
              ) : (
                <></>
              )}
            </>
          ) : user.displayName ? (
            <Form
              user={user}
              selectedItem={selectedItem}
              booksCollectionRef={booksCollectionRef}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {selectedItem === "" ? (
        <form>
          <FormControl>
            <InputLabel>🔍 検索</InputLabel>
            <Input
              value={searchItem}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  return false;
                }
              }}
              onChange={(event) => setSearchItem(event.target.value)}
            />
          </FormControl>
          <div className="dummy">
            <Input />
          </div>
          {!searchItem ? (
            <></>
          ) : (
            <p>
              <Button
                type="button"
                onClick={clear}
                variant="contained"
                color="secondary"
                disabled={!searchItem}
              >
                リセット
              </Button>
            </p>
          )}
        </form>
      ) : (
        <></>
      )}
      {searchItem !== "" ? (
        <Search
          user={user}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
      ) : (
        <>
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
                  リセット
                </Button>
              </p>
              <Main selectedItem={selectedItem} user={user} />
            </>
          ) : user ? (
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
          ) : (
            <FlipMove className="books">
              {books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              ))}
            </FlipMove>
          )}
        </>
      )}
    </div>
  );
}

export default App;
