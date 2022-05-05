import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase-config";
import { AuthContext } from "../context/auth";
import style from "./NavBar.module.css";
import Button from "./Button";

function NavBar() {
  const { user } = useContext(AuthContext);
  const logout = async () => {
    await auth.signOut();
  };
  let uid;
  if (user !== null) {
    uid = user.uid;
  }

  return (
    <div className={style.nav_container}>
      <NavLink to={"/"}>
        <button className={style.button51} >Home </button>
      </NavLink>

      {user ? (
        <>
          <NavLink to={`/user/${uid}`}>
            <button className={style.button51}>My Profile </button>
          </NavLink>
          <NavLink to={"/"}>
            <button
              className={style.button51}
              onClick={logout}
            >Sign Out</button>
          </NavLink>
          <NavLink to={"/newpet"}>
            <button className={style.button51} >New Pet</button>
          </NavLink>
          <NavLink to={"/message"}>
            <button className={style.button51}>Messages</button>
          </NavLink>
          <NavLink to={"/show"}>
              <button className={style.button51}>AppShow</button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>
            <button className={style.button51} >Login</button>
          </NavLink>
          <NavLink to={"/signup"}>
            <button className={style.button51} >Sign up</button>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavBar;
