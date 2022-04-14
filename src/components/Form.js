import "../css/App.css";
import React, { useState, useEffect } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  limit,
  query,
  onSnapshot,
} from "firebase/firestore";

const Form = ({ user, selectedItem, booksCollectionRef }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");
  const maps = [];
  const [books, setBooks] = useState([]);

  for (let i = 0; i < inputTitle.length; i++) {
    if (i === 0) {
      maps.push(`${inputTitle[i]}`);
    } else if (i + 1 <= inputTitle.length) {
      maps.push(`${inputTitle[i - 1]}${inputTitle[i]}`);
    }
  }

  for (let i = 0; i < inputAuthor.length; i++) {
    if (i === 0) {
      maps.push(`${inputAuthor[i]}`);
    } else if (i + 1 <= inputAuthor.length) {
      maps.push(`${inputAuthor[i - 1]}${inputAuthor[i]}`);
    }
  }

  for (let i = 0; i < inputBody.length; i++) {
    if (i === 0) {
      maps.push(`${inputBody[i]}`);
    } else if (i + 1 <= inputBody.length) {
      maps.push(`${inputBody[i - 1]}${inputBody[i]}`);
    }
  }

  const addBook = (event) => {
    event.preventDefault(); // will stop the REFRESH
    addDoc(collection(db, "books"), {
      title: inputTitle,
      author: inputAuthor,
      body: inputBody,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userid: user.uid,
      maps: maps,
    });
    setInputBody("");
  };

  useEffect(() => {
    if (selectedItem !== "") {
      const q = query(
        booksCollectionRef,
        where("title", "==", selectedItem),
        limit(1)
      );
      onSnapshot(q, (querySnapshot) => {
        setBooks(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data() };
          })
        );
      });
    }
    if (books[0]) {
      setInputTitle(selectedItem);
      setInputAuthor(books[0].author);
    }
  }, [selectedItem, books]);

  return (
    <form>
      <FormControl>
        {/* <InputLabel>✅ Write a Title</InputLabel> */}
        <InputLabel>✅ タイトル</InputLabel>
        <Input
          value={inputTitle}
          onChange={(event) => setInputTitle(event.target.value)}
        />
      </FormControl>
      <FormControl>
        {/* <InputLabel>✅ Write a Author</InputLabel> */}
        <InputLabel>✅ 著者</InputLabel>
        <Input
          value={inputAuthor}
          onChange={(event) => setInputAuthor(event.target.value)}
        />
      </FormControl>
      <FormControl>
        {/* <InputLabel>✅ Write Body</InputLabel> */}
        <InputLabel>✅ 本文（必須）</InputLabel>
        <Input
          value={inputBody}
          onChange={(event) => setInputBody(event.target.value)}
        />
      </FormControl>
      {!inputBody ? (
        <></>
      ) : (
        <p>
          <Button
            type="submit"
            onClick={addBook}
            variant="contained"
            color="primary"
            disabled={!inputBody}
          >
            {/* Add Highlight */}
            追加
          </Button>
        </p>
      )}
      {!inputBody && !inputAuthor && !inputTitle ? (
        <></>
      ) : (
        <p>
          <Button
            type="button"
            onClick={() => {
              setInputAuthor("");
              setInputTitle("");
              setInputBody("");
            }}
            variant="contained"
            color="secondary"
            disabled={!inputBody && !inputAuthor && !inputTitle}
          >
            {/* Reset */}
            リセット
          </Button>
        </p>
      )}
    </form>
  );
};

export default Form;
