import React, { useEffect, useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Book from "./Book";
import "../css/Search.css";

const Search = ({ user, searchItem, setSearchItem }) => {
  const booksCollectionRef = collection(db, "books");
  const [searchItems, setSearchItems] = useState([]);
  const mapInput = [""];

  for (let i = 0; i < searchItem.length; i++) {
    if (i < 9) {
      mapInput.push(`${searchItem[i]}${searchItem[i + 1]}`);
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
    setSearchItem("");
    event.preventDefault();
  };

  return (
    <>
      {/* <form>
        <FormControl>
          <InputLabel>🔍 検索</InputLabel>
          <Input
            value={searchItem}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                return false;
              }
            }}
            onChange={(event) => setSearchItem(event.target.value)}
          />
        </FormControl>
        <div className="dummy">
          <Input />
        </div>
        {!searchItem ? (
          <></>
        ) : (
          <p>
            <Button
              type="button"
              onClick={clear}
              variant="contained"
              color="secondary"
              disabled={!searchItem}
            >
              リセット
            </Button>
          </p>
        )}
      </form> */}
      {searchItems.length > 0 ? (
        <div className="searchBook">
          {searchItems.map((searchItem) => (
            <Book book={searchItem} user={user} />
          ))}
        </div>
      ) : searchItem.length > 0 && searchItems.length === 0 ? (
        <>見つかりません</>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
