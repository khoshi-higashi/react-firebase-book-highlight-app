import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
  Button,
} from "@mui/material";
import "./Todo.css";
import { db } from "./firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Todo(props) {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={props.todo.todo} secondary="Dummy deadline ⏰" />
      </ListItem>
      <DeleteForeverIcon
        onClick={(event) => deleteDoc(doc(db, "todos", props.todo.id))}
      />
    </List>
  );
}

export default Todo;
