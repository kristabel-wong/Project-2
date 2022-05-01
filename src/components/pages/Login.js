import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase-config";

import Button from "../Button";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3>Login</h3>
        <input
          placeholder="Email..."
          name="loginEmail"
          value={loginEmail}
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          name="loginPassword"
          value={loginPassword}
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <Button onClick={login} classnames="btn" content="Login" />
      </div>

      <h4> User Logged In:</h4>
      <h4>{user?.email}</h4>

      <div>
        <Button
          onClick={signInWithGoogle}
          content="Sign in with google"
          classnames="btn"
        />
      </div>
    </div>
  );
}

export default Login;
