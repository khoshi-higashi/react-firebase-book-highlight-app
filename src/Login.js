import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { Button } from "@mui/material";
import "./Login.css";

const Login = ({ user }) => {
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
          <div className="user__name">
            <p>{user && user.displayName}</p>
          </div>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default Login;
