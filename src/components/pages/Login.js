import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const [errorDisplay, setErrorDisplay] = useState("");
	let navigate = useNavigate();
	let logInFailed = false;

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
			logInFailed = false;
			navigate("/");
		} catch (error) {
			logInFailed = true;
			setErrorDisplay(error.message);
			console.log(error.message);
			setLoginEmail("");
			setLoginPassword("");
			return;
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
				petArr: [],
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
				logInFailed = false;
				navigate("/");
			})
			.catch((error) => {
				logInFailed = true;
				setErrorDisplay(error.message);
				console.log(error);
			});
	};
	const displayError = function () {
		if (logInFailed) {
			errorDisplay.map((error) => <message>error</message>);
		}
	};

	useEffect(() => {
		displayError();
	}, [logInFailed]);
	return (
		<div>
			<div>
				{errorDisplay}
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
