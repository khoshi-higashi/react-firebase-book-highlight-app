import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import Book from "./Book";
import "./Main.css";

const Main = (props) => {
  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState([]);

  useEffect(() => {
    setActiveBook(props.selectedItem);
  }, [props.selectedItem, activeBook]);

  const q = query(
    collection(db, "books"),
    where("title", "==", activeBook),
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      );
    });
  });

  return (
    <div>
      {props.selectedItem !== 0 && (
        <div className="mainBook">
          <p>{props.selectedItem}</p>
          <>
            {books.map((book) => (
              <Book book={book} />
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default Main;
