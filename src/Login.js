import {
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { Button, Input, FormControl, InputLabel } from "@mui/material";
import "./Login.css";
import React, { useState } from "react";
import googleLogo from "./assets/btn_google_signin_dark_normal_web.png";

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
            <img src={googleLogo} alt="" />
          </Button>
          <p>or</p>
          <Button onClick={() => signInAnonymously(auth)}>
            Login anonymously
          </Button>
          <div>
            <p>You need to login...</p>
          </div>
        </>
      ) : (
        <>
          <div className="user__name">
            <Button className="user__button" onClick={toggle}>
              {username && !user.isAnonymous ? (
                <>{username}</>
              ) : !username && !user.isAnonymous ? (
                <>{user.displayName}</>
              ) : (
                <>You are logged in anonymously</>
              )}
            </Button>
            {open && !user.isAnonymous ? (
              <div>
                <FormControl>
                  <InputLabel>&#x270f; Write a Username</InputLabel>
                  <Input
                    value={inputUsername}
                    onChange={(event) => setInputUsername(event.target.value)}
                  />
                </FormControl>
                <p>
                  <Button
                    onClick={UpdateUsername}
                    disabled={!inputUsername}
                    type="submit"
                  >
                    Update Username
                  </Button>
                </p>
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
