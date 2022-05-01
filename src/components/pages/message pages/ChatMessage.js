import React from "react";
import { auth } from "../../../firebase-config";
import { v4 } from "uuid";

// just assigns classes for sent or received
function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;
	const messageId = v4();
	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

	return (
		<>
			<div key={messageId} className={`message ${messageClass}`}>
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
