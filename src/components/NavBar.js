import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase-config";
import { AuthContext } from "../context/auth";

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
    <div className="nav-container">
      <NavLink to={"/"}>
        <Button classnames="nav-btn btn" content="Home" />
      </NavLink>

      {user ? (
        <>
          <NavLink to={`/user/${uid}`}>
            <Button classnames="nav-btn btn" content="My Profile" />
          </NavLink>
          <NavLink to={"/"}>
            <Button
              classnames="nav-btn btn"
              onClick={logout}
              content="Sign Out"
            />
          </NavLink>
          <NavLink to={"/newpet"}>
            <Button classnames="nav-btn btn" content="New pet" />
          </NavLink>
          <NavLink to={"/message"}>
            <button className="nav-btn btn">Messages</button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>
            <Button classnames="nav-btn btn" content="Login" />
          </NavLink>
          <NavLink to={"/signup"}>
            <Button classnames="nav-btn btn" content="Sign Up" />
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavBar;
