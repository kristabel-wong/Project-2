import React from "react";
import { auth } from "../../../firebase-config";
import { v4 } from "uuid";
import style from './message.module.css';

// just assigns classes for sent or received
function ChatMessage(props) {
	const { text, uid, from, to, messageId } = props.message;

	const messageClass = from === auth.currentUser.uid ? style.sent : style.received;

	return (
		<>
			<div className={`${style.message} ${messageClass}`}>
				<img style={{width: '50px'}}
					src={
						"" ||
						"https://cdn-icons-png.flaticon.com/512/141/141783.png"
					}
				/>
				<p className={style.text}>{text}</p>
                {/* <p>{createdAt.nanoseconds}</p> */}
			</div>
		</>
	);
}

export default ChatMessage;
