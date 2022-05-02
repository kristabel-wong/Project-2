import {
	collection,
	query,
	onSnapshot,
	setDoc,
	doc,
	Timestamp,
	orderBy,
	addDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "./ChatMessage";
import React, { useEffect, useRef, useState } from "react";
import style from './message.module.css';

function ChatBox({ user1, user2 }) {
	const [messages, setMessages] = useState([]);
	const [user] = useAuthState(auth);
	const [formValue, setFormValue] = useState("");
	const dummy = useRef();
	const currentUserOne = user1;
	const currentUserTwo = user2;

	const getMessages = async function () {
		const id =
			currentUserOne > currentUserTwo
				? `${currentUserOne + currentUserTwo}`
				: `${currentUserTwo + currentUserOne}`;
		const msgsRef = collection(db, "favourites", id, "messages");
		const q = query(msgsRef, orderBy("createdAt", "asc"));
		onSnapshot(q, (querySnapshot) => {
			let msgs = [];
			querySnapshot.docs.map((doc) => {
				msgs.push(doc.data());
			});
			setMessages(msgs);
		});
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		const id =
			currentUserOne > currentUserTwo
				? `${currentUserOne + currentUserTwo}`
				: `${currentUserTwo + currentUserOne}`;

		await addDoc(collection(db, "favourites", id, "messages"), {
			text: formValue,
			from: currentUserOne,
			to: currentUserTwo,
			photoURL,
			createdAt: Timestamp.fromDate(new Date()),
		});
		setFormValue("");

		dummy.current.scrollIntoView({ behavior: "smooth" }); // ensure we always scroll to the bottom when message appears
	};
	useEffect(() => {
		getMessages();
	}, [messages]);
	return (
		<div>
            <h1 className={style.header}> <em>Placeholder</em> </h1>
			<main className={style.mainChat}>
				{messages.map((msg, index) => (
					<ChatMessage key={index} message={msg} />
				))}
				<span ref={dummy}></span> {/* scroll to bottom feature */}
			</main>

			<form className={style.messageForm} onSubmit={sendMessage}>
				{" "}
				{/* form to submit message - writing value to firestore */}
				<input
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder="Type Message ..."
                    className={style.messageInput}
				/>{" "}
				{/* binding state to form input */}
				<button type="submit" disabled={!formValue} className={style.button}>
					🕊️
				</button>
			</form>
		</div>
	);
}
export default ChatBox;
