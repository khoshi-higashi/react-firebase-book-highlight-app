import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import { db, auth } from "./firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import { onAuthStateChanged } from "firebase/auth";
import "./Book.css";

function Book(props) {
  const [open, setOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [user, setUser] = useState(null);
  const [activeBook, setActiveBook] = useState(0);

  useEffect(() => {
    setActiveBook(props.selectedItem);
  }, [props.selectedItem, activeBook]);

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

  const UpdateBook = () => {
    if (inputTitle !== "") {
      updateDoc(doc(db, "books", props.book.id), {
        title: inputTitle,
      });
    }
    if (inputAuthor !== "") {
      updateDoc(doc(db, "books", props.book.id), {
        author: inputAuthor,
      });
    }
    if (inputBody !== "") {
      updateDoc(doc(db, "books", props.book.id), {
        body: inputBody,
      });
    }
    updateDoc(doc(db, "books", props.book.id), {
      user: user.displayName,
    });
    setInputTitle("");
    setInputAuthor("");
    setInputBody("");
    setOpen(false);
  };

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            magin: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 5,
            padding: (2, 4, 3),
          }}
        >
          <h1>Update content</h1>
          <FormControl>
            <InputLabel>Title</InputLabel>
            <Input
              value={inputTitle}
              onChange={(event) => setInputTitle(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Author</InputLabel>
            <Input
              value={inputAuthor}
              onChange={(event) => setInputAuthor(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Body</InputLabel>
            <Input
              value={inputBody}
              onChange={(event) => setInputBody(event.target.value)}
            />
          </FormControl>
          <Button
            onClick={() => {
              UpdateBook();
              setOpen(false);
            }}
            disabled={!inputBody && !inputAuthor && !inputTitle}
          >
            Update Book
          </Button>
        </Box>
      </Modal>
      <div className="book">
        <div className="book__item">
          <List>
            <ListItem>
              <ListItemText
                onClick={() => {
                  props.setSelectedItem(props.book.title);
                  returnTop();
                }}
                primary={"”" + props.book.body + "”"}
                secondary={props.book.title + ", " + props.book.author}
                className="book__body"
              />
            </ListItem>
            {user ? (
              <div className="book__edit">
                <button onClick={(e) => setOpen(true)}>Edit</button>
                <DeleteForeverIcon
                  onClick={(event) =>
                    deleteDoc(doc(db, "books", props.book.id))
                  }
                />
              </div>
            ) : (
              <></>
            )}
          </List>
        </div>
      </div>
    </>
  );
}

export default Book;
