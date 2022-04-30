import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function NavBar() {
	return (
		<div className="nav-container">
			<NavLink to={"/"}>
				<Button classnames="nav-btn btn" content="Home" />
			</NavLink>
			<NavLink to={"/login"}>
				<Button classnames="nav-btn btn" content="Login" />
			</NavLink>
			<NavLink to={"/signup"}>
				<Button classnames="nav-btn btn" content="Sign Up" />
			</NavLink>
			<NavLink to={"/"}>
				<Button classnames="nav-btn btn" content="Sign Out" />
			</NavLink>
		</div>
	);
}

export default NavBar;
