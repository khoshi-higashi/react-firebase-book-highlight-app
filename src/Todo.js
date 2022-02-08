import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
} from "@mui/material";
import "./Todo.css";

function Todo(props) {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary={props.text} secondary="Dummy deadline ⏰" />
      </ListItem>
    </List>
  );
}

export default Todo;
