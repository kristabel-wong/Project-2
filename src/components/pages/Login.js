import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase-config";

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

  const logout = async () => {
    await auth.signOut();
    setUser(null);
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
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </div>

      <h4> User Logged In:</h4>
      <h4>{user?.email}</h4>

      <div>
        <button onClick={signInWithGoogle}> Sign in with google</button>
      </div>
      <NavLink to={"/"}>
        <button onClick={logout}>Sign Out</button>
      </NavLink>
    </div>
  );
}

export default Login;
