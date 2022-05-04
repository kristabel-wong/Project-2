import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";

import Button from "../Button";

function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	//   const [users, setUsers] = useState([]);

	const createUser = async (user) => {
		const uid = user.user.uid;
		await setDoc(doc(db, "users", user.user.uid), {
			firstName: firstName,
			lastName: lastName,
			email: registerEmail,
			uid: uid,
			favArr: [],
			petArr: [],
			location: "",
			description: "",
			imageUrl: "",
		});
	};

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			).then((user) => {
				createUser(user);
			});
		} catch (error) {
			// need to add alert or message when failed signup
			console.log(error.message);
		}
	};
	return (
		<div>
			<h3>Register User</h3>
			<input
				placeholder="First Name..."
				onChange={(event) => {
					setFirstName(event.target.value);
				}}
			/>
			<input
				placeholder="Last Name..."
				onChange={(event) => {
					setLastName(event.target.value);
				}}
			/>
			<input
				placeholder="Email..."
				onChange={(event) => {
					setRegisterEmail(event.target.value);
				}}
			/>
			<input
				placeholder="Password..."
				type="password"
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
