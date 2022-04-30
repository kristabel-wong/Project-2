import {
	collection,
	query,
	onSnapshot,
	setDoc,
	doc,
	serverTimestamp,
	orderBy,
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "./ChatMessage";
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

function ChatBox() {
	const [messages, setMessages] = useState([]);
	const [user] = useAuthState(auth);
	const [formValue, setFormValue] = useState("");
	const dummy = useRef();

	const getMessages = async function () {
		query(
			onSnapshot(
				collection(db, "favourites", "usertwo_pettwo", "messages"),
				orderBy("createdAt", "DESCENDING"),
				(snapshot) => {
					setMessages(
						snapshot.docs.reverse().map((doc) => doc.data())
					);
				}
			)
		);
	};

	const messageId = v4();
	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		const docRef = doc(
			db,
			"favourites",
			"usertwo_pettwo",
			"messages",
			messageId
		);
		const payload = {
			text: formValue,
			createdAt: serverTimestamp(),
			uid,
			photoURL,
		};
		await setDoc(docRef, payload);

		setFormValue("");
		dummy.current.scrollIntoView({ behavior: "smooth" }); // ensure we always scroll to the bottom when message appears
	};
	useEffect(() => {
		getMessages();
	}, [messages]);
	return (
		<>
			<main>
				{messages.map((msg) => (
					<ChatMessage key={msg.id} message={msg} />
				))}
				<span ref={dummy}></span> {/* scroll to bottom feature */}
			</main>

			<form onSubmit={sendMessage}>
				{" "}
				{/* form to submit message - writing value to firestore */}
				<input
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder="Type Message ..."
				/>{" "}
				{/* binding state to form input */}
				<button type="submit" disabled={!formValue}>
					🕊️
				</button>
			</form>
		</>
	);
}
export default ChatBox;
