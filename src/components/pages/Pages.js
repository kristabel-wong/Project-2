import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import UserShow from "./user pages/UserShow";

function Pages() {
	const location = useLocation();
	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/user/:type" element={<UserShow />} />
		</Routes>
	);
}

export default Pages;
