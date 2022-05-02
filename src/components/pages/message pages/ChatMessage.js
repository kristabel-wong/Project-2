import React from "react";
import { auth } from "../../../firebase-config";
import { v4 } from "uuid";

// just assigns classes for sent or received
function ChatMessage(props) {
	const { text, uid, from, to, messageId } = props.message;

	const messageClass = from === auth.currentUser.uid ? "sent" : "received";

	return (
		<>
			<div className={`message ${messageClass}`}>
				<img
					src={
						"" ||
						"https://cdn-icons-png.flaticon.com/512/141/141783.png"
					}
				/>
				<p>{text}</p>
			</div>
		</>
	);
}

export default ChatMessage;
