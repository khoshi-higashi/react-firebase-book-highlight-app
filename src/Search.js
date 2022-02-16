import React, { useEffect, useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import Book from "./Book";
import "./Search.css";

const Search = ({ user }) => {
  const [input, setInput] = useState("");
  const booksCollectionRef = collection(db, "books");
  const [serachItems, setSerachItems] = useState([]);

  const q = query(
    booksCollectionRef,
    where("maps", "array-contains-any", [input])
    // orderBy("timestamp", "desc")
  );

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setSerachItems(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      );
    });
  });

  return (
    <>
      <form>
        <FormControl>
          <InputLabel>🔍 Search</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        {!input ? (
          <></>
        ) : (
          <p>
            <Button
              type="button"
              onClick={() => {
                setInput("");
              }}
              variant="contained"
              color="secondary"
              disabled={!input}
            >
              Reset
            </Button>
          </p>
        )}
      </form>
      {serachItems.map((serachItem) => (
        <div className="searchBook">
          <Book book={serachItem} user={user} />
        </div>
      ))}
    </>
  );
};

export default Search;
