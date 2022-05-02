import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import UserShow from "./user pages/UserShow";
import Message from "./message pages/Message";
import Petnew from "./pets pages/PetNew";
import PetShow from "./pets pages/PetShow";
import PetIndex from "./pets pages/PetIndex";
import PetEdit from "./pets pages/PetEdit";
import App from "./pets pages/App-Show";

function Pages() {
	const location = useLocation();
	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/user/:id" element={<UserShow />} />
			<Route path="/message" element={<Message />} />
			<Route path="/newpet" element={<Petnew />} />
			<Route path="/pet/edit/:type" element={<PetEdit />} />
			<Route path="/pet/:type" element={<PetShow />} />
			<Route path="/pet/index" element={<PetIndex />} />
			<Route path="/app" element={<App />} />
		</Routes>
	);
}

export default Pages;
