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
  const [booksNumber, setBooksNumber] = useState([]);
  const [activeBook, setActiveBook] = useState([]);
  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    setActiveBook(selectedItem);
  }, [selectedItem, activeBook]);

  const q = query(
    booksCollectionRef,
    where("title", "==", activeBook),
    orderBy("timestamp", "asc"),
    // limit(20)
  );

  // const q_number = query(
  //   booksCollectionRef,
  //   where("title", "==", activeBook),
  //   orderBy("number", "asc"),
  //   orderBy("timestamp", "asc"),
  //   limit(20)
  // );

  // const q_next = query(
  //   booksCollectionRef,
  //   where("title", "==", activeBook),
  //   orderBy("timestamp", "asc"),
  //   limit(20),
  //   startAfter(20)
  // );

  // const q_number_next = query(
  //   booksCollectionRef,
  //   where("title", "==", activeBook),
  //   orderBy("number", "asc"),
  //   orderBy("timestamp", "asc"),
  //   limit(20),
  //   startAfter(20)
  // );

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      );
    });
  });

  // useEffect(() => {
  //   onSnapshot(q_number, (querySnapshot) => {
  //     setBooksNumber(
  //       querySnapshot.docs.map((doc) => {
  //         return { ...doc.data() };
  //       })
  //     );
  //   });
  // });

  return (
    <div ref={ref}>
      {selectedItem !== 0 && (
        <>
          {/* <div className="mainBook">
            {booksNumber.map((book) => (
              <Book key={book.id} book={book} user={user} />
            ))}
          </div> */}
          <div className="mainBook">
            {books.map((book) => (
              <Book key={book.id} book={book} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default Main;
