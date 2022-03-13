import { signInWithPopup, updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Button, Input, FormControl, InputLabel } from "@mui/material";
import "../css/Login.css";
import React, { useState } from "react";
import googleLogo from "../assets/btn_google_signin_dark_normal_web.png";

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
          <div>
            <p>サインインすると投稿・編集が行えます</p>
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
                  <InputLabel>&#x270f; ユーザー名を変更</InputLabel>
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
                    ユーザー名を更新します
                  </Button>
                </p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <Button onClick={() => auth.signOut()}>ログアウト</Button>
        </>
      )}
    </div>
  );
};

export default Login;
