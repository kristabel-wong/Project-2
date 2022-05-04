import {
	collection,
	query,
	onSnapshot,
	Timestamp,
	orderBy,
	addDoc,
	setDoc,
    doc,
    getDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import ChatMessage from "./ChatMessage";
import React, { useEffect, useRef, useState } from "react";
import style from "./message.module.css";

function ChatBox({ user1, user2, petID }) {
	const [messages, setMessages] = useState([]);
	const [formValue, setFormValue] = useState("");

	const dummy = useRef();
	const currentUserOne = user1; // current user logged in
	const currentUserTwo = user2.uid; // recipient user
	const getMessages = async function () {
		const id =
			currentUserOne > currentUserTwo
				? `${currentUserOne + currentUserTwo}`
				: `${currentUserTwo + currentUserOne}`;
		const msgsRef = collection(db, "favourites", id, petID);
		const q = query(msgsRef, orderBy("createdAt", "asc"));
		onSnapshot(q, (querySnapshot) => {
			let msgs = [];
			querySnapshot.docs.map((doc) => {
				msgs.push(doc.data());
			});
			setMessages(msgs);
		});
        
	};
    
	let data;
	const getDoc = async function (){
		const data= await getDoc(db, "users",currentUserTwo)
		console.log(data);
	}



	const sendMessage = async (e) => {
		e.preventDefault();
		const { photoURL } = auth.currentUser;
		const id =
			currentUserOne > currentUserTwo
				? `${currentUserOne + currentUserTwo}`
				: `${currentUserTwo + currentUserOne}`;

		await addDoc(collection(db, "favourites", id, petID), {
			text: formValue,
			from: currentUserOne,
			to: currentUserTwo,
			photoURL,
			createdAt: Timestamp.fromDate(new Date()),
		});
		setFormValue("");

		dummy.current.scrollIntoView({ behavior: "smooth" }); // ensure we always scroll to the bottom when message appears
	};

	// useeffect here is ensuring we update messages based on who is clicked in the left
	useEffect(() => {
		getMessages();

	}, [messages]);

	return (
		<div className={style.messageComponent}>
			<div className={style.header}>
				<h1>
					{" "}
					<em>{user2.firstName}</em>{" "}
				</h1>
			</div>
			<div>
				<main className={style.mainChat}>
					{messages.map((msg, index) => (
						<ChatMessage key={index} message={msg} />
					))}
					<span ref={dummy}></span> {/* scroll to bottom feature */}
				</main>
			</div>
			<div>
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
					<button
						type="submit"
						disabled={!formValue}
						className={style.button}
					>
						🕊️
					</button>
				</form>
			</div>
		</div>
	);
}
export default ChatBox;
