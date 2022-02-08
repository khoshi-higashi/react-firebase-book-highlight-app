import "./App.css";
import React, { useEffect, useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import Todo from "./Todo";
import Book from "./Book";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [titles, setTitles] = useState([]);
  const [author, setAuthor] = useState([]);
  const [body, setBody] = useState([]);
  const [books, setBooks] = useState("");

  const todosCollectionRef = collection(db, "todos");
  const booksCollectionRef = collection(db, "books");

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This code here... fires when the app.js loads
    onSnapshot(
      query(booksCollectionRef, orderBy("timestamp", "desc")),
      (snapshot) => {
        setBooks(
          snapshot.docs.map((doc) => {
            console.log(doc);
            return {
              id: doc.id,
              book: doc.data().book,
            };
          })
        );
      }
    );
  }, []);

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This code here... fires when the app.js loads
    onSnapshot(
      query(todosCollectionRef, orderBy("timestamp", "desc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              todo: doc.data().todo,
            };
          })
        );
      }
    );
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); // will stop the REFRESH
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput(""); // clear up the input after clicking add todo button
  };

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
            value={inputTitle}
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
          disabled={!inputTitle || !inputAuthor || !inputBody}
        >
          Add Highlight
        </Button>
      </form>

      <ul>
        {books.map((book) => (
          <Book book={book} />
        ))}
      </ul>

      <h1>Hello Clever Programmers 🚀!</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add ToDo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
