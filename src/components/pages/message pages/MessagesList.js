import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import style from "./message.module.css";

import {
	collection,
	query,
	where,
	onSnapshot,
	doc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import ChatBox from "./ChatBox";
import User from "../../User";
import styles from "./message.module.css";

// displays all favourited users on the left of message box
function MessagesList() {
	const [users, setUsers] = useState([]);
	const [chat, setChat] = useState("");
	const user2 = chat;
	const tempPetId = "9sYo60KFi2k52JJcZwpZ";

	// references the favArr in database and returns an array with all partnerships uids
	const getFavArr = async function (user1) {
		const arrayRef = doc(db, "users", user1);
		const docSnap = await getDoc(arrayRef);
		const data = docSnap.data();
		const favArr = data.favArr;
		return favArr;
	};

	// gets the log of messages and updates automatically
	const getChatLog = async function (user) {
		const user1 = user.uid;
		const usersRef = collection(db, "users");
		const q = query(usersRef, where("uid", "in", await getFavArr(user1)));

		const unsub = onSnapshot(q, (querySnapshot) => {
			let usersArr = [];
			querySnapshot.forEach((doc) => {
				usersArr.push(doc.data());
			});
			setUsers(usersArr);
		});
		return () => unsub();
	};

	// this allows the chat to update both users
	const selectUser = function (user) {
		setChat(user);
	};

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				getChatLog(user);
			}
		});
	}, []);
	return (
		<div className={style.messageListCont}>
			<div className={style.useContainer}>
				<h1 style={{ margin: "10px", textAlign: "center" }}>Users</h1>
				{users.map((user, index) => (
					<User key={index} user={user} selectUser={selectUser} />
				))}
			</div>
			<div className={style.chatbox}>
				{chat ? (
					<div>
						<h3>{chat.person}</h3>
						<ChatBox
							user1={auth.currentUser.uid}
							user2={user2}
							petID={tempPetId}
						/>
					</div>
				) : (
					<div>
						<h3 className="select-user-chatbox">Select a user</h3>
					</div>
				)}
			</div>
		</div>
	);
}

export default MessagesList;
