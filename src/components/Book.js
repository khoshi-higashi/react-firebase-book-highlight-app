import React, { useState, useEffect, forwardRef } from "react";
import { List, ListItem, Modal } from "@mui/material";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import "../css/Book.css";

const Book = forwardRef(
  ({ user, book, setSelectedItem, selectedItem }, ref) => {
    const [open, setOpen] = useState(false);
    const [activeBook, setActiveBook] = useState(0);

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
