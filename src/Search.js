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
    if (i < 9) {
      mapInput.push(`${input[i]}${input[i + 1]}`);
    }
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

  const clear = (event) => {
    setInput("");
    event.preventDefault(); // will stop the REFRESH
  };

  return (
    <>
      <form>
        <FormControl>
          <InputLabel>🔍 Search</InputLabel>
          <Input
            value={input}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                return false;
              }
            }}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <div className="dummy">
          <Input />
        </div>
        {!input ? (
          <></>
        ) : (
          <p>
            <Button
              type="button"
              onClick={clear}
              variant="contained"
              color="secondary"
              disabled={!input}
            >
              Reset
            </Button>
          </p>
        )}
      </form>
      {searchItems.length > 0 ? (
        <div className="searchBook">
          {searchItems.map((searchItem) => (
            <Book book={searchItem} user={user} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
