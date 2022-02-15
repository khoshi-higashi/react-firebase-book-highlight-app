import {
  signInWithPopup,
  signInAnonymously,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { Button, Input, FormControl, InputLabel } from "@mui/material";
import "./Login.css";
import React, { useState, useEffect } from "react";

const Login = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [username, setUsername] = useState("");

  const toggle = () => setOpen(!open);

  const UpdateUsername = (event) => {
    event.preventDefault();

    if (inputUsername !== "") {
      updateProfile(auth.currentUser, {
        displayName: inputUsername,
      });
      setUsername(inputUsername);
    }
    setInputUsername("");
    setOpen(false);
  };

  return (
    <div className="app__loginContainer">
      {!user ? (
        <>
          <Button onClick={() => signInWithPopup(auth, provider)}>
            Sign In
          </Button>
          or
          <Button onClick={() => signInAnonymously(auth)}>
            Anonymous Sign In
          </Button>
          <div>
            <p>You need to login...</p>
          </div>
        </>
      ) : (
        <>
          <div className="user__name">
            <Button className="user__button" onClick={toggle}>
              {username ? <>{username}</> : <>{user.displayName}</>}
            </Button>
            {open ? (
              <div>
                <FormControl>
                  <InputLabel>Update Username</InputLabel>
                  <Input
                    value={inputUsername}
                    onChange={(event) => setInputUsername(event.target.value)}
                  />
                </FormControl>
                <Button
                  onClick={UpdateUsername}
                  disabled={!inputUsername}
                  type="submit"
                >
                  Update Username
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default Login;
