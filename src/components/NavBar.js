import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase-config";

import Button from "./Button";

function NavBar() {
	let [userLogged, setUserLogged] = useState(false);
	let user = auth;
	console.log(userLogged);

	if (user.currentUser != null) {
		setUserLogged(true);
	} else setUserLogged = false;

	const logout = async () => {
		await auth.signOut();
	};

	useEffect(() => {}, []);
	return (
		<div className="nav-container">
			<NavLink to={"/"}>
				<Button classnames="nav-btn btn" content="Home" />
			</NavLink>
            <NavLink to={"/message"}>
                <button className="nav-btn btn">Messages</button>
            </NavLink>
			{!userLogged ? (
				<NavLink to={"/"}>
					<Button
						classnames="nav-btn btn"
						onClick={logout}
						content="Sign Out"
					/>
				</NavLink>
			) : (
				""
			)}
			{!userLogged ? (
				<NavLink to={"/login"}>
					<Button classnames="nav-btn btn" content="Login" />
				</NavLink>
			) : (
				""
			)}
			{!userLogged ? (
				<NavLink to={"/signup"}>
					<Button classnames="nav-btn btn" content="Sign Up" />
				</NavLink>
			) : (
				""
			)}
			{!userLogged ? (
     			<NavLink to={"/newpet"}>
     				<button className="nav-btn btn">New pet</button>
     			</NavLink>
		    ) : (		 
			    ""
			)}
		</div>
	);
}

export default NavBar;
