import React from "react";
import { auth } from "../../../firebase-config";

// just assigns classes for sent or received messages
function ChatMessage(props) {
	const { text, from, photoURL } = props.message;

	const messageClass = from === auth.currentUser.uid ? "sent" : "received";

	return (
		<>
			<div className={`message ${messageClass}`}>
				<img
					src={
						photoURL ||
						"https://cdn-icons-png.flaticon.com/512/141/141783.png"
					}
				/>
				<p>{text}</p>
			</div>
		</>
	);
}

export default ChatMessage;
