import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
  Button,
  Modal,
} from "@mui/material";
import "./Todo.css";
import { db } from "./firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import {  } from "@material-ui/core/styles";
import { makeStyles } from "@mui/styles";
// import { makeStyles } from "@material-ui/core";import Modal from "@material-ui/core/Modal";
import Box from "@mui/material/Box";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     margin: `auto`,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

function Todo(props) {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            magin: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 5,
            padding: (2, 4, 3),
          }}
        >
          <h1>I am a modal</h1>
          <button onClick={(e) => setOpen(false)}></button>
        </Box>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Dummy deadline ⏰"
          />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={(event) => deleteDoc(doc(db, "todos", props.todo.id))}
        />
      </List>
    </>
  );
}

export default Todo;
