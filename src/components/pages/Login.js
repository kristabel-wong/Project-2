import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Button from "../Button";

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
		} catch (error) {
			console.log(error.message);
		}
	};

	const createUser = async (result) => {
		const user = result.user;
		const userDocRef = doc(db, "users", user.uid);
		const userDocSnap = await getDoc(userDocRef);
		const uid = user.uid;

		if (!userDocSnap.exists()) {
			await setDoc(doc(db, "users", user.uid), {
				firstName: user.displayName.split(" ")[0],
				lastName: user.displayName.split(" ")[1],
				email: user.email,
				uid: uid,
				favRef: [],
				favPets: [],
				location: "",
				description: "",
				imageUrl: user.photoURL,
			});
		}
	};

	const provider = new GoogleAuthProvider();
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				createUser(result);
			})
			.catch((error) => {
				console.log(error);
			});
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
					type="password"
					onChange={(event) => {
						setLoginPassword(event.target.value);
					}}
				/>
				<Button onClick={login} classnames="btn" content="Login" />
			</div>

			<h4> User Logged In:</h4>
			<h4>{user?.email}</h4>

			<div>
				<Button
					onClick={signInWithGoogle}
					content="Sign in with google"
					classnames="btn"
				/>
			</div>
		</div>
	);
}

export default Login;
