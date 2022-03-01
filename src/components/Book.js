import React, { useState, useEffect, forwardRef } from "react";
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
import { db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import "../css/Book.css";

const Book = forwardRef(
  ({ user, book, setSelectedItem, selectedItem }, ref) => {
    const [open, setOpen] = useState(false);
    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");
    const [inputBody, setInputBody] = useState("");
    const [activeBook, setActiveBook] = useState(0);

    useEffect(() => {
      setActiveBook(selectedItem);
    }, [selectedItem, activeBook]);

    const UpdateBook = () => {
      if (inputTitle !== "") {
        updateDoc(doc(db, "books", book.id), {
          title: inputTitle,
        });
      }
      if (inputAuthor !== "") {
        updateDoc(doc(db, "books", book.id), {
          author: inputAuthor,
        });
      }
      if (inputBody !== "") {
        updateDoc(doc(db, "books", book.id), {
          body: inputBody,
        });
      }
      updateDoc(doc(db, "books", book.id), {
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

    const bookTitle = `${book.title}, ${book.author}`;

    return (
      <div ref={ref}>
        <Modal open={open} onClose={() => setOpen(false)}>
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
            <div className="book__modal">
              <div className="book__item__modal">
                ”{book.body}”<br />
                <span>{bookTitle}</span>
              </div>
            </div>
          </Box>
        </Modal>
        <div className="book">
          <div className="book__item">
            <List>
              <ListItem>
                <p className="book__body">
                  <span
                    className="book__body__body"
                    onClick={() => setOpen(true)}
                  >
                    ”{book.body}”
                  </span>
                  <br />
                  <span
                    className="book__body__title"
                    onClick={() => {
                      setSelectedItem(book.title);
                      returnTop();
                    }}
                  >
                    {bookTitle}
                  </span>
                </p>
              </ListItem>
              {user.uid === book.userid ? (
                <div className="book__edit">
                  {/* <button onClick={() => setOpen(true)}>Edit</button> */}
                  {/* <button onClick={() => setOpen(true)}>編集</button> */}
                  <DeleteForeverIcon
                    onClick={() => deleteDoc(doc(db, "books", book.id))}
                  />
                </div>
              ) : (
                <></>
              )}
            </List>
          </div>
        </div>
      </div>
    );
  }
);

export default Book;
