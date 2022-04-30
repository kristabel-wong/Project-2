import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
	setDoc,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "./ChatMessage";
import React, { useEffect, useRef, useState } from "react";

function ChatBox() {
	const [messages, setMessages] = useState([]);
	const getMessages = async function () {
		const q = query(
			onSnapshot(
				collection(db, "favourites", "usertwo_pettwo", "messages"),
				(snapshot) => {
					setMessages(snapshot.docs.map((doc) => doc.data()));
				}
			)
		);
	};

	const [user] = useAuthState(auth);
	const [formValue, setFormValue] = useState("");
	const dummy = useRef();
	// const messagesRef = firestore
	// 	.collection("favourites")
	// 	.doc("usertwo_pettwo")
	// 	.collection("messages"); // this references collection name (so we can try userOne_petOne)
	// const query = messagesRef.orderBy("createdAt").limit(25); // get messaged by createdAt and show max 25 messages
	// const [messages] = useCollectionData(query, { idField: "id" }); // making a query for that data

	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		// const updateTimestamp = await updateDoc(docRef, {
		// 	timestamp: serverTimestamp(),
		// });

		const docRef = doc(
			db,
			"favourites",
			"usertwo_pettwo",
			"messages",
			"message1"
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
				{messages &&
					messages.map((msg) => (
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
