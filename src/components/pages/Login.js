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
import { motion } from "framer-motion";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Button from "../Button";
import style from "./SignUp.module.css";

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
				adoptedPets:[],   
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className={style.background}>
				<div className={style.container}>
					{errorDisplay}
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
					<Button
						onClick={login}
						classnames={style.button74}
						content="Login"
					/>
					<h4 style={{ margin: "20px" }}> User Logged In:</h4>
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
		</motion.div>
	);
}

export default Login;
