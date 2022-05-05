import React, { useState } from "react";
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
import style from "./SignUp.module.css";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [user, setUser] = useState({});
	let navigate = useNavigate();

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
			navigate("/");
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
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={style.background}>
			<div className={style.container}>
				<h3 className={style.hover}>Login</h3>
				<input
					placeholder="Email..."
					name="loginEmail"
					value={loginEmail}
					className={style.input}
					onChange={(event) => {
						setLoginEmail(event.target.value);
					}}
				/>
				<input
					placeholder="Password..."
					name="loginPassword"
					value={loginPassword}
					type="password"
					className={style.input}
					onChange={(event) => {
						setLoginPassword(event.target.value);
					}}
				/>
				<Button onClick={login} classnames={style.button74} content="Login" />
				<h4 style={{margin:"20px"}}> User Logged In:</h4>
			    <h4>{user?.email}</h4>

     			<div>
     				<Button
     					onClick={signInWithGoogle}
						classnames={style.button74}
     					content="Sign in with google"
     				/>
     			</div>
			</div>

			
		</div>
	);
}

export default Login;
