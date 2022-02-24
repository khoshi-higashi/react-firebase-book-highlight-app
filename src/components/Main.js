import React, { useEffect, useState, forwardRef } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Book from "./Book";
import "../css/Main.css";

const Main = forwardRef(({ user, selectedItem }, ref) => {
  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState([]);
  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    setActiveBook(selectedItem);
  }, [selectedItem, activeBook]);

  const q = query(
    booksCollectionRef,
    where("title", "==", activeBook),
    orderBy("timestamp", "asc")
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
    <div ref={ref}>
      {selectedItem !== 0 && (
        <div className="mainBook">
          {books.map((book) => (
            <Book key={book.id} book={book} user={user} />
          ))}
        </div>
      )}
    </div>
  );
});

export default Main;
