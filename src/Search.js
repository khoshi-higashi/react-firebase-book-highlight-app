import React, { useEffect, useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";
import Book from "./Book";
import "./Search.css";

const Search = ({ user }) => {
  const [input, setInput] = useState("");
  const booksCollectionRef = collection(db, "books");
  const [searchItems, setSearchItems] = useState([]);
  const mapInput = [""];

  for (let i = 0; i < input.length; i++) {
    mapInput.push(`${input[i]}${input[i + 1]}`);
  }

  const q = query(
    booksCollectionRef,
    where("maps", "array-contains-any", mapInput)
  );

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setSearchItems(
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
      {searchItems.map((searchItem) => (
        <div className="searchBook">
          <Book book={searchItem} user={user} />
        </div>
      ))}
    </>
  );
};

export default Search;
