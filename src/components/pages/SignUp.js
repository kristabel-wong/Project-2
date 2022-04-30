import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase-config";

import Button from "../Button";

function SignUp() {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			console.log(user);
		} catch (error) {
			// need to add alert or message when failed signup
			console.log(error.message);
		}
	};
	return (
		<div>
			<h3>Register User</h3>
			<input
				placeholder="Email..."
				onChange={(event) => {
					setRegisterEmail(event.target.value);
				}}
			/>
			<input
				placeholder="Password..."
				onChange={(event) => {
					setRegisterPassword(event.target.value);
				}}
			/>
			<NavLink to={"/"}>
				<Button
					onClick={register}
					classnames="btn"
					content="Register"
				/>
			</NavLink>
		</div>
	);
}

export default SignUp;
