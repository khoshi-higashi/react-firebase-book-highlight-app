import "./App.css";
import React, { useEffect, useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import Book from "./Book";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroller";

function App() {
  const [input, setInput] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, "books");

  const loadFunc = (page) => {
    setBooks([...books, page]);
  };

  const items = (
    <ul>
      {books.map((book, i) => (
        <Book book={book} />
      ))}
    </ul>
  );

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This code here... fires when the app.js loads
    onSnapshot(
      query(booksCollectionRef, orderBy("timestamp", "asc", limit(10))),
      (snapshot) => {
        setBooks(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              // book: doc.data(),
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
    });
    setInputTitle(""); // clear up the input after clicking add todo button
    setInputAuthor(""); // clear up the input after clicking add todo button
    setInputBody(""); // clear up the input after clicking add todo button
  };

  return (
    <div className="App">
      <h1>Book highlight submission site 📚</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a Title</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInputTitle(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>✅ Write a Author</InputLabel>
          <Input
            value={inputAuthor}
            onChange={(event) => setInputAuthor(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>✅ Write Body</InputLabel>
          <Input
            value={inputBody}
            onChange={(event) => setInputBody(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          onClick={addBook}
          variant="contained"
          color="primary"
          disabled={!inputBody}
        >
          Add Highlight
        </Button>
      </form>

      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading...
          </div>
        }
      >
        {/* <ul>
          {books.map((book, i) => (
            <Book book={book} />
          ))}
        </ul> */}
        {items}
      </InfiniteScroll>
    </div>
  );
}

export default App;
