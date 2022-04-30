import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<div className="nav-container">
			<NavLink to={"/"}>
				<button className="nav-btn btn">Home</button>
			</NavLink>
			<NavLink to={"/login"}>
				<button className="nav-btn btn">Login</button>
			</NavLink>
			<NavLink to={"/signup"}>
				<button className="nav-btn btn">Sign Up</button>
			</NavLink>
		</div>
	);
}

export default NavBar;
