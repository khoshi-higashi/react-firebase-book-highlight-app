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

const Main = ({ user, selectedItem }) => {
  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState([]);
  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    setActiveBook(selectedItem);
  }, [selectedItem, activeBook]);

  const q = query(
    booksCollectionRef,
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
      {selectedItem !== 0 && (
        <div className="mainBook">
          <div>
            {books.map((book) => (
              <Book book={book} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
