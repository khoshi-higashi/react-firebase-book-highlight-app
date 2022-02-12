import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  limit,
  doc,
  where,
} from "firebase/firestore";
import { db, auth, provider } from "./firebase";
import Book from "./Book";

const Main = (props) => {
  const booksCollectionRef = collection(db, "books");
  const q = query(
    booksCollectionRef,
    where("title", "in", [props.selectedItem]),
    orderBy("timestamp", "desc")
  );
  //   const booksCollectionRef = doc(db, "books", props.selectedItem);
  const [books, setBooks] = useState([]);

  const items = (
    <ul className="books">
      {books.map((book) => (
        <Book book={book} />
      ))}
    </ul>
  );

  useEffect(() => {
    // This code here... fires when the app.js loads
    onSnapshot(
      //   query(
      //     booksCollectionRef,
      //     orderBy("timestamp", "desc"),
      //     where("title", "==", props.selectedItem)
      //   ),
      q,
      //   doc(db, "books", props.selectedItem),
      // booksCollectionRef,
      (snapshot) => {
        setBooks(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              // book: doc.data(),
              ...doc.data(),
            };
          })
        );
      }
    );
  }, []);

  //   console.log(booksCollectionRef);
  //   console.log(props.selectedItem);
  console.log(books);

  return (
    <div>
      {props.selectedItem !== 0 && (
        <>
          {props.selectedItem}
          <>{items}</>
          {books.map((book) => (
            <li>{book.title}</li>
          ))}
        </>
      )}
    </div>
  );
};

export default Main;
