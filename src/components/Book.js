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
import { deleteDoc, doc, updateDoc, collection } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import "../css/Book.css";

const Book = forwardRef(
  ({ user, book, setSelectedItem, selectedItem }, ref) => {
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [activeBook, setActiveBook] = useState(0);
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateAuthor, setUpdateAuthor] = useState("");
    const [updateBody, setUpdateBody] = useState("");
    const [updateNo, setUpdateNo] = useState("");
    const maps = [];

    useEffect(() => {
      setActiveBook(selectedItem);
    }, [selectedItem, activeBook]);

    for (let i = 0; i < updateBody.length; i++) {
      if (i === 0) {
        maps.push(`${updateBody[i]}`);
      } else if (i + 1 <= updateBody.length) {
        maps.push(`${updateBody[i - 1]}${updateBody[i]}`);
      }
    }

    for (let i = 0; i < updateTitle.length; i++) {
      if (i === 0) {
        maps.push(`${updateTitle[i]}`);
      } else if (i + 1 <= updateTitle.length) {
        maps.push(`${updateTitle[i - 1]}${updateTitle[i]}`);
      }
    }

    for (let i = 0; i < updateAuthor.length; i++) {
      if (i === 0) {
        maps.push(`${updateAuthor[i]}`);
      } else if (i + 1 <= updateAuthor.length) {
        maps.push(`${updateAuthor[i - 1]}${updateAuthor[i]}`);
      }
    }

    const updateBook = () => {
      if (updateTitle !== "") {
        updateDoc(doc(db, "books", book.id), {
          title: updateTitle,
        });
      }

      if (updateAuthor !== "") {
        updateDoc(doc(db, "books", book.id), {
          author: updateAuthor,
        });
      }

      if (updateBody !== "") {
        updateDoc(doc(db, "books", book.id), {
          body: updateBody,
        });
      }

      if (updateNo !== "") {
        updateDoc(doc(db, "books", book.id), {
          number: updateNo,
        });
      }

      updateDoc(collection(db, "books", book.id), {
        maps: maps,
      })

      setUpdateTitle("");
      setUpdateAuthor("");
      setUpdateBody("");
      setUpdateNo("");
      setUpdateOpen(false);
    };

    const returnTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };


    return (
      <div ref={ref}>
        <Modal className="modal" open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
                    value={updateBody}
                    onChange={(event) => setUpdateBody(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  {/* <InputLabel>Body</InputLabel> */}
                  <InputLabel>位置No</InputLabel>
                  <Input
                    value={updateNo}
                    onChange={(event) => setUpdateNo(event.target.value)}
                  />
                </FormControl>

                <Button
                  onClick={() => {
                    updateBook();
                    setUpdateOpen(false);
                  }}
                  disabled={!updateBody && !updateAuthor && !updateTitle && !updateNo}
                >
                  {/* Update Book */}
                  更新
                </Button>
              </div>
            </div>
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
                  {book.number && (
                    <span className="book__item__modal__number">
                      <br />
                      位置：{book.number}
                    </span>
                  )}
                </span>
                {/* <p className="modal__close">
                  <Button onClick={() => setOpen(false)}>閉じる</Button>
                </p> */}
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
                    {book.number && (
                      <>
                        <br />
                        位置：{book.number}
                      </>
                    )}
                  </span>
                </p>
              </ListItem>
              {user && user.uid === book.userid ? (
                <div className="book__edit">
                  <button onClick={() => setUpdateOpen(true)}>編集</button>
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
