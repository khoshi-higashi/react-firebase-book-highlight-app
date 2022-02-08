import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
  Button,
  Modal,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./Book.css";
import { db } from "./firebase";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";

function Book(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputBody, setInputBody] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const UpdateBook = () => {
    updateDoc(doc(db, "books", props.book.id), {
      title: inputTitle,
      author: inputAuthor,
      body: inputBody,
    });
    setOpen(false);
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
          <h1>I am a modal</h1>
          <FormControl>
            <InputLabel>Title</InputLabel>
            <Input
              value={inputTitle}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Author</InputLabel>
            <Input
              value={inputAuthor}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Body</InputLabel>
            <Input
              value={inputBody}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <Button onClick={UpdateBook}>Update Book</Button>
        </Box>
      </Modal>
      <div className="book">
        <List>
          <ListItem>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText
              primary={props.book.body}
              secondary={props.book.title}
            />
          </ListItem>
          <button onClick={(e) => setOpen(true)}>Edit</button>
          <DeleteForeverIcon
            onClick={(event) => deleteDoc(doc(db, "books", props.book.id))}
          />
        </List>
      </div>
    </>
  );
}

export default Book;
