import "./App.css";
import React, { useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Form = ({ user }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");

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

  return (
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
      <p>
        <Button
          type="submit"
          onClick={addBook}
          variant="contained"
          color="primary"
          disabled={!inputBody}
        >
          Add Highlight
        </Button>
      </p>
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
        Reset
      </Button>
    </form>
  );
};

export default Form;
