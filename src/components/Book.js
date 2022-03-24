import React, { useState, useEffect, forwardRef } from "react";
import {
  List,
  ListItem,
  Button,
  Modal,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import "../css/Book.css";

const Book = forwardRef(
  ({ user, book, setSelectedItem, selectedItem }, ref) => {
    const [open, setOpen] = useState(false);
    const [activeBook, setActiveBook] = useState(0);
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");

    useEffect(() => {
      setActiveBook(selectedItem);
    }, [selectedItem, activeBook]);

    const returnTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return (
      <div ref={ref}>
        <Modal>
          {/* <Modal open={open} onClose={() => setOpen(false)}> */}
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
            <h1>更新</h1>
            <FormControl>
              <InputLabel>タイトル</InputLabel>
              <Input
                value={updateTitle}
                onChange={(event) => setUpdateTitle(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>著者</InputLabel>
              <Input
                value={updateAuthor}
                onChange={(event) => setUpdateAuthor(event.target.value)}
              />
            </FormControl>
            <FormControl>
              {/* <InputLabel>Body</InputLabel> */}
              <InputLabel>本文</InputLabel>
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
              {/* Update Book */}
              更新
            </Button>
          </Box>
        </Modal>
        <Modal className="modal" open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              magin: "auto",
              bgcolor: "background.paper",
              padding: (2, 4, 3),
            }}
          >
            <div className="book__modal">
              <div className="book__item__modal">
                ”{book.body}”<br />
                <span>
                  {book.title}
                  <br />
                  {book.author}
                </span>
              </div>
            </div>
          </Box>
        </Modal>
        <div className="book">
          <div className="book__item">
            <List>
              <ListItem>
                <p className="book__body">
                  {window.innerWidth < 480 ? (
                    <span
                      className="book__body__body"
                      onClick={() => setOpen(true)}
                    >
                      ”{book.body}”
                    </span>
                  ) : (
                    <span className="book__body__body">”{book.body}”</span>
                  )}
                  <br />
                  <span
                    className="book__body__title"
                    onClick={() => {
                      setSelectedItem(book.title);
                      returnTop();
                    }}
                  >
                    {book.title}
                    <br />
                    {book.author}
                  </span>
                </p>
              </ListItem>
              {user && user.uid === book.userid ? (
                <div className="book__edit">
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
