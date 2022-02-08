import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

function Todo(props) {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Todo" secondary={props.text} />
      </ListItem>
    </List>
  );
}

export default Todo;
