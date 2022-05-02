import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import style from './message.module.css';

import {
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
} from "firebase/firestore";
import ChatBox from "./ChatBox";
import User from "../../User";

// displays all favourited users on the left of message box
function MessagesList() {
	const [users, setUsers] = useState([]);
	const [chat, setChat] = useState("");
	const user2 = chat.uid;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const user1 = user.uid;
				const usersRef = collection(db, "users");
				const q = query(usersRef, where("uid", "not-in", [user1]));

				const unsub = onSnapshot(q, (querySnapshot) => {
					let usersArr = [];
					querySnapshot.forEach((doc) => {
						usersArr.push(doc.data());
					});
					setUsers(usersArr);
				});
				return () => unsub();
			} else {
				// User is signed out
				// ...
			}
		});
	}, []);

	const selectUser = function (user) {
		setChat(user);
	};
	return (
		<div>
			<div className={style.useContainer}>
				{users.map((user, index) => (
					<User key={index} user={user} selectUser={selectUser} />
				))}
			</div>
			<div className={style.chatbox}>
				{chat ? (
					<div>
						<h3>{chat.person}</h3>
						<ChatBox user1={auth.currentUser.uid} user2={user2} />
					</div>
				) : (
					<div>
						<h3>Select a user</h3>
					</div>
				)}
			</div>
		</div>
	);
}

export default MessagesList;
