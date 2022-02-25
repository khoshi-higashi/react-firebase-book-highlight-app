import React, { useEffect, useState } from "react";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "../css/TitleSelect.css";

const TitleSelect = ({ setSelectedItem, selectedItem, booksCollectionRef }) => {
  const [books, setBooks] = useState([]);
  const titles = [];

  useEffect(() => {
    onSnapshot(
      query(booksCollectionRef, orderBy("timestamp", "desc")),
      (snapshot) => {
        setBooks(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }
    );
  }, []);

  {
    books.map((book) => titles.push(`${book.title}`));
  }
  const setTitles = [...new Set(titles)];

  return (
    <div className="select__title">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          書籍のタイトルを選択してください
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItem}
          label="title"
          onChange={(event) => setSelectedItem(event.target.value)}
        >
          {setTitles.map((title) => (
            <MenuItem className="demo-simple-select" value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TitleSelect;
