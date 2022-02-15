import React, { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebase";
import { Button } from "@mui/material";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user has logged in...
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      // person some cleanup actions
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="app__loginContainer">
      {!user ? (
        <>
          <Button onClick={() => signInWithPopup(auth, provider)}>
            Sign In
          </Button>
          <div>
            <p>You need to login...</p>
          </div>
        </>
      ) : (
        <>
          <p>{user && user.displayName}</p>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default Login;
