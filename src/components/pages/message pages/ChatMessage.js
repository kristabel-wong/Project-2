import React from "react";
import { auth } from "../../../firebase-config";
import styles from "./message.module.css";
// just assigns classes for sent or received messages
function ChatMessage(props) {
	const { text, from, photoURL } = props.message;

	const messageClass =
		from === auth.currentUser.uid ? styles.sent : styles.received;

	return (
		<>
			<div className={`${styles.message} ${messageClass}`}>
				<img
					src={
						photoURL ||
						"https://cdn-icons-png.flaticon.com/512/141/141783.png"
					}
				/>
				<p>{text}</p>
				{/* <p>{createdAt.nanoseconds}</p> */}
			</div>
		</>
	);
}

export default ChatMessage;
